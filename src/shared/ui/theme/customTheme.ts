import { ButtonProps } from '@mui/material';
import { Components as MuiComponents, createTheme, Theme, ThemeOptions } from '@mui/material/styles';

// 커스텀 색상 정의
declare module '@mui/material/styles' {
    interface Palette {
        customColor: {
            main: string;
            light: string;
            dark: string;
        };
        white: Palette['primary'];
    }
    interface PaletteOptions {
        customColor?: {
            main: string;
            light: string;
            dark: string;
        };
        white: PaletteOptions['primary'];
    }

    // 커스텀 타이포그래피 변형 정의
    interface TypographyVariants {
        customVariant: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        customVariant?: React.CSSProperties;
    }

    // 사이즈
    interface ButtonGroupPropsSizeOverrides {
        xsmall: true;
    }
    interface ButtonPropsSizeOverrides {
        xsmall: true;
    }
    interface ToggleButtonGroupPropsSizeOverrides {
        xsmall: true;
    }
    interface ToggleButtonPropsSizeOverrides {
        xsmall: true;
    }

    interface Components {
        // 상단 Filter 영역
        CuiFunction?: {
            styleOverrides?: {
                root?: React.CSSProperties;
            };
        };

        // ASIDE 인풋 영역
        CuiAsideInputs?: {
            styleOverrides?: {
                root?: React.CSSProperties;
            };
            variants?: Array<{
                props: { variant?: 'default' | 'style2' };
                style: React.CSSProperties;
            }>;
        };
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        customVariant: true;
    }
}
declare module '@mui/material/ButtonGroup' {
    interface ButtonGroupPropsSizeOverrides {
        xsmall: true;
    }
}
declare module '@mui/material/ToggleButtonGroup' {
    interface ToggleButtonGroupPropsSizeOverrides {
        xsmall: true;
    }
}

// Button props에 'white' 추가
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        white: true;
    }
}

/**
 * css 변수로 사용할 스타일
 */
const customThemeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
        },
        customColor: {
            main: '#313747',
            light: '#D9EEFF',
            dark: '#cc3300',
        },
        white: {
            main: '#FFFFFF',
            contrastText: '#000000',
        },
    },
    typography: {
        // fontSize: 16,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        customVariant: {
            fontSize: '1.25rem',
            fontWeight: 600,
            textTransform: 'uppercase',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
            variants: [
                {
                    props: { size: 'small' },
                    style: {
                        height: '30px',
                        fontSize: '12px',
                    },
                },
                {
                    props: { size: 'xsmall' },
                    style: {
                        height: '24px',
                        fontSize: '12px',
                    },
                },
                {
                    props: { variant: 'contained' },
                    style: ({ ownerState }: { ownerState: ButtonProps }) => ({
                        boxShadow: 'none !important',
                        ...(ownerState.color === 'white' && {
                            backgroundColor: '#fff',
                            color: 'black',
                            border: `1px solid rgba(0,0,0,0.12)`,
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.05)',
                            },
                        }),
                    }),
                },
            ],
        },

        MuiSelect: {
            styleOverrides: {
                root: {
                    width: 'auto',
                    minWidth: '0',
                    backgroundColor: '#fff',
                    color: 'black',
                    fontSize: 'small',
                    textAlign: 'left',
                    // '& .MuiOutlinedInput-notchedOutline': {
                    //     borderColor: 'blue',
                    // },
                    // '&:hover .MuiOutlinedInput-notchedOutline': {
                    //     borderColor: 'green',
                    // },
                    // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    //     borderColor: 'red',
                    // },
                },
            },
            variants: [
                {
                    props: { size: 'small' },
                    style: {
                        height: '30px',
                        // padding: '8px 12px',
                    },
                },
            ],
        },
        MuiMenuItem: {
            // styleOverrides: {
            //     root: {
            //         fontSize: '1rem', // 드롭다운 메뉴 항목의 폰트 사이즈 설정
            //     },
            // },
            // variants: [
            //     {
            //         props: { variant: 'small' },
            //         style: {
            //             fontSize: '0.75rem', // small variant일 때 MenuItem 폰트 사이즈
            //             padding: '4px 12px', // small variant일 때 padding 조정
            //         },
            //     },
            // ],
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: 'auto',
                    minWidth: '0',
                    backgroundColor: '#fff',
                    color: 'black',
                    fontSize: 'small',
                    textAlign: 'left',
                    // lineHeight: '1',
                },
            },
            variants: [
                {
                    props: { size: 'small' },
                    style: {
                        '& .MuiInputBase-root': {
                            height: '30px', // 입력 필드의 높이 설정
                            fontSize: 'small',

                            '> input': {
                                padding: '5px 14px', // input field height
                            },
                        },
                    },
                },
            ],
        },
        MuiInputLabel: {
            variants: [
                {
                    props: { size: 'small' },
                    style: {
                        fontSize: 'small',
                        '&.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -9px) scale(0.9)',
                        },
                        '&.MuiInputLabel-outlined': {
                            transform: 'translate(14px, 6px) scale(1)',
                        },
                        '&.MuiInputLabel-outlined.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -9px) scale(0.9)',
                        },
                    },
                },
            ],
        },
        MuiOutlinedInput: {
            variants: [
                {
                    props: { size: 'small' },
                    style: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            legend: {
                                fontSize: 'small',
                                lineHeight: '1',
                                transform: 'scale(0.9)',

                                '& > span': {
                                    padding: '0',
                                },
                            },
                        },
                    },
                },
            ],
        },

        MuiButtonGroup: {
            variants: [
                {
                    props: { size: 'small' },
                    style: {
                        height: '30px',
                        paddingLeft: '0.5em',
                        paddingRight: '0.5em',
                    },
                },
                {
                    props: { size: 'xsmall' },
                    style: {
                        '.MuiButtonBase-root': {
                            minWidth: 0,
                            height: '24px',
                            paddingLeft: '0.3em',
                            paddingRight: '0.3em',
                            borderRadius: '2px',
                            fontSize: '12px',
                        },
                    },
                },
            ],
        },

        MuiToggleButton: {
            variants: [
                {
                    props: { size: 'small' },
                    style: {
                        height: '30px',
                        paddingLeft: '0.5em',
                        paddingRight: '0.5em',
                    },
                },
                {
                    props: { size: 'xsmall' },
                    style: {
                        height: '24px',
                        paddingLeft: '0.3em',
                        paddingRight: '0.3em',
                        fontSize: '12px',
                    },
                },
            ],
        },

        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    '.MuiFormControlLabel-asterisk': {
                        color: 'red', // 원하는 색상으로 변경
                    },
                },
            },
        },

        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    '&.Mui-checked + .MuiSwitch-track': {
                        opacity: 1,
                    },
                },
                track: {
                    backgroundColor: '#000',
                    opacity: 0.15,
                },
            },
        },

        /**
         * 커스텀 영역
         */
        // 상단 Function 영역
        CuiFunction: {
            styleOverrides: {
                root: {
                    padding: '15px',
                    borderRadius: '5px',
                    backgroundColor: '#f7f8fa',
                },
            },
        },

        // Aside Input 영역
        CuiAsideInputs: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.7em',

                    // stack
                    '> *': {
                        flex: '1 1 auto',
                        flexDirection: 'row !important',
                        flexWrap: 'nowrap',
                        gap: '0.5em',

                        // Label
                        '> *': {
                            flex: '1 1 auto !important',
                            justifyContent: 'flex-end',
                            margin: '0 !important',
                            cursor: 'default',

                            // InputField
                            '> .MuiFormControl-root': {
                                flex: '1 1 auto !important',
                            },

                            // 일반 텍스트
                            '.text': {
                                fontSize: 'small',
                            },

                            // label
                            '> *:not([class]), > .MuiTypography-root': {
                                flex: '0 0 80px !important',
                                fontSize: 'small',
                                fontWeight: 600,
                                cursor: 'default',

                                '*': {
                                    cursor: 'default',
                                },

                                '.MuiFormControlLabel-label': {
                                    fontSize: 'small',
                                    fontWeight: 600,
                                },
                            },
                        },

                        '.isAutoWid': {
                            flex: 'none !important',
                        },

                        // Button
                        '> button': {
                            display: 'block',
                            flex: '0 0 auto !important',
                            marginLeft: 'auto !important',
                            cursor: 'pointer',
                        },
                    },
                },
            },
            variants: [
                {
                    props: { variant: 'style2' },
                    style: {
                        background: 'red',
                    },
                },
            ],
        },
    } as MuiComponents<Omit<Theme, 'components'>>,
};

const customTheme = createTheme(customThemeOptions, { disableStylesGeneration: false });

export { customTheme };
