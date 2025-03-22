import axios from 'axios';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const dirname = fileURLToPath(new URL('.', import.meta.url));

const requset = axios.create({
    baseURL: process.env.GITLAB_URL,
    headers: {
        'PRIVATE-TOKEN': process.env.GITLAB_API_TOKEN,
    },
});

const packageList = async () => {
    return requset({
        url: `/packages`,
        method: 'GET',
        data: {},
    });
};

const packageDelete = async id => {
    return requset({
        url: `/packages/${id}`,
        method: 'DELETE',
        data: {},
    });
};

// Get the current version from package.json
const getCurrentVersion = () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return packageJson.version;
};

// Write the new version to package.json
const setNewVersion = async newVersion => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    packageJson.version = newVersion;

    fs.writeFileSync('package.json', `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
};

// Increment the version
const incrementVersion = (version, level) => {
    const [major, minor, patch] = version.split('.').map(Number);

    if (level === 'major') {
        return `${major + 1}.0.0`;
    }
    if (level === 'minor') {
        return `${major}.${minor + 1}.0`;
    }
    if (level === 'patch') {
        return `${major}.${minor}.${patch + 1}`;
    }
    throw new Error("Invalid level. Choose from 'major', 'minor', or 'patch'.");
};

// Create a release branch and tag
const createReleaseBranch = async version => {
    const release = `release`;
    const devel = `devel`;

    try {
        const res = execSync(`git branch -r`, { encoding: 'utf-8' });

        if (res.includes('release')) {
            execSync(`git checkout ${release}`);
            execSync(`git pull origin ${release}`);
        } else {
            execSync(`git checkout -b ${release} ${devel}`);
        }

        execSync(`git merge --no-ff ${devel}`);

        if (process.argv[2] === 'notag') {
            console.log('target package version ===>', getCurrentVersion());
            await packageList().then(async result => {
                const filtredItem = result.data.find(item => item.version === getCurrentVersion());

                if (filtredItem) {
                    console.log('■■■■■■■■■ ui package delete Start ■■■■■■■■');
                    console.log('target package id ===>', filtredItem.id);
                    await packageDelete(filtredItem.id).then(() => {
                        console.log('■■■■■■■■■ ui package delete End ■■■■■■■■');
                        execSync(`git push origin ${release}`);
                    });
                } else {
                    console.log('target package version does not exist');
                    execSync(`git push origin ${release}`);
                }
            });
        } else if (process.argv[3] === 'notag') {
            execSync(`git push origin ${release}`);
        } else {
            setNewVersion(version);
            execSync(`git add .`);
            execSync(`git commit -m "Release version ${version}"`);
            execSync(`git tag v${version}`);
            execSync(`git push origin v${version}`);
            execSync(`git push origin ${release}`);
        }

        execSync(`git checkout ${devel}`);
        execSync(`git merge --no-ff ${release}"`);
        execSync(`git push origin ${devel}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    // execSync(`git add package.json`);
    // execSync(`git commit -m "Release version ${version}"`);
    // execSync(`git tag v${version}`);
    // execSync(`git push origin v${version}`);
    // execSync(`git push origin ${branchName}`);

    // execSync(`git checkout main`);
    // execSync(`git merge --no-ff ${branchName}`);
    // execSync(`git tag v${version}`);
    // execSync(`git push origin v${version}`);
    // execSync(`git push origin main`);
};

const findTestFile = dir => {
    let testFiles = [];
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        // 파일이면 test가 포함된지 확인
        if (stat.isFile() && (file.endsWith('.test.tsx') || file.endsWith('.test.ts'))) {
            testFiles.push(file);
        }

        // 디렉토리이면 재귀적으로 다시 탐색
        if (stat.isDirectory()) {
            testFiles = testFiles.concat(findTestFile(fullPath));
        }
    });

    return testFiles;
};

const main = async () => {
    const testDir = path.resolve(dirname, 'src');
    const result = findTestFile(testDir);

    try {
        if (process.argv.length < 3) {
            console.log('Usage: node createTag.js [major|minor|patch|notag] ');
            process.exit(1);
        } else if (process.argv[2] !== 'notag') {
            const level = process.argv[2];
            const currentVersion = getCurrentVersion();
            const newVersion = incrementVersion(currentVersion, level);
            const res = execSync(`git tag`, { encoding: 'utf-8' });
            if (process.argv.length < 4 && res.includes(`v${newVersion}`)) {
                console.log(`Already tag version v${newVersion}`);
                process.exit(1);
            }
            console.log(`Updated version from ${currentVersion} to ${newVersion}`);

            if (result.length > 0) {
                execSync('npm run test', { stdio: 'inherit' });
            }

            createReleaseBranch(newVersion);
        } else {
            if (result.length > 0) {
                execSync('npm run test', { stdio: 'inherit' });
            }
            createReleaseBranch();
        }
    } catch (error) {
        console.error('test Failed');
        process.exit(1);
    }
};

main();
