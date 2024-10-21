// main
export interface CVMaker {

    setPDFUrl(url: string | null): void;

    addScript(options: { src?: string, text?: string }): Promise<HTMLScriptElement>;

    setUI(ui: UI): void;
}

// ui
export interface NativeUI {
    // layout
    block(...children: UIComponent[]): UILayoutBlock;

    rows(...children: UIComponent[]): UILayoutRows;

    cols(...children: UIComponent[]): UILayoutCols;

    // components
    empty(): UIEmpty;

    text(text: string): UIText;

    title(text: string): UITitle;

    button(text: string, disabled?: boolean, onAction?: () => void): UIButton;

    checkbox(checked?: boolean, onAction?: (checked: boolean) => void): UICheckbox;

    radio(group: string, checked?: boolean, onAction?: (checked: boolean) => void): UIRadio;

    slider(min: number, max: number, value?: number, step?: number, onAction?: (value: number) => void): UISlider;

    dropdown(options: string[], selected?: number, onAction?: (option: string, index: number) => void): UIDropdown;

    inputField(placeholder?: string, onAction?: (text: string) => void): UIInputField;

    inputArea(placeholder?: string, onAction?: (text: string) => void): UIInputArea;
}

export abstract class UI implements NativeUI {
    ui?: NativeUI;

    abstract getComponents(): UIComponent[];

    // layout
    block(...children: UIComponent[]): UILayoutBlock {
        return this.ui!.block(...children);
    }

    rows(...children: UIComponent[]): UILayoutRows {
        return this.ui!.rows(...children);
    }

    cols(...children: UIComponent[]): UILayoutCols {
        return this.ui!.cols(...children);
    }

    // components
    empty(): UIEmpty {
        return this.ui!.empty();
    }

    text(text: string): UIText {
        return this.ui!.text(text);
    }

    title(text: string): UITitle {
        return this.ui!.title(text);
    }

    button(text: string, disabled?: boolean, onAction?: () => void): UIButton {
        return this.ui!.button(text, disabled, onAction);
    }

    checkbox(checked?: boolean, onAction?: (checked: boolean) => void): UICheckbox {
        return this.ui!.checkbox(checked, onAction);
    }

    radio(group: string, checked?: boolean, onAction?: (checked: boolean) => void): UIRadio {
        return this.ui!.radio(group, checked, onAction);
    }

    slider(min: number, max: number, value?: number, step?: number, onAction?: (value: number) => void): UISlider {
        return this.ui!.slider(min, max, value, step, onAction);
    }

    dropdown(options: string[], selected?: number, onAction?: (option: string, index: number) => void): UIDropdown {
        return this.ui!.dropdown(options, selected, onAction);
    }

    inputField(placeholder?: string, onAction?: (text: string) => void): UIInputField {
        return this.ui!.inputField(placeholder, onAction);
    }

    inputArea(placeholder?: string, onAction?: (text: string) => void): UIInputArea {
        return this.ui!.inputArea(placeholder, onAction);
    }
}

export interface NativeComponent {}

export interface UIComponent {
    render(): NativeComponent;

    update(): this;

    readonly fill: boolean;
    setFill(fill: boolean): this;
}

export interface UILayout extends UIComponent {
    readonly children: UIComponent[];
    setChildren(children: UIComponent[]): this;
}

export interface UILayoutBlock extends UILayout {}

export interface UILayoutFlex extends UILayout {
    readonly alignX: "left" | "center" | "right" | "between" | "around" | "evenly" | null;
    setAlignX(alignX: "left" | "center" | "right" | "between" | "around" | "evenly" | null): this;

    readonly alignY: "top" | "center" | "bottom" | null;
    setAlignY(alignY: "top" | "center" | "bottom" | null): this;
}

export interface UILayoutRows extends UILayoutFlex {}

export interface UILayoutCols extends UILayoutFlex {}

export interface UIEmpty extends UIComponent {}

export interface UIText extends UIComponent {
    readonly text: string;
    setText(text: string): this;
}

export interface UITitle extends UIComponent {
    readonly text: string;
    setText(text: string): this;
}

export interface UIButton extends UIComponent {
    readonly text: string;
    setText(text: string): this;

    readonly disabled: boolean;
    setDisabled(disabled: boolean): this;

    readonly onAction: () => void;
    setOnAction(onAction: () => void): this;
}

export interface UICheckbox extends UIComponent {
    readonly checked: boolean;
    setChecked(checked: boolean): this;

    readonly onAction: (checked: boolean) => void;
    setOnAction(onAction: (checked: boolean) => void): this;
}

export interface UIRadio extends UIComponent {
    readonly group: string;
    setGroup(group: string): this;

    readonly checked: boolean;
    setChecked(checked: boolean): this;

    readonly onAction: (checked: boolean) => void;
    setOnAction(onAction: (checked: boolean) => void): this;
}

export interface UISlider extends UIComponent {
    readonly min: number;
    setMin(min: number): this;

    readonly max: number;
    setMax(max: number): this;

    readonly value: number;
    setValue(value: number): this;

    readonly step: number;
    setStep(step: number): this;

    readonly onAction: (value: number) => void;
    setOnAction(onAction: (value: number) => void): this;
}

export interface UIDropdown extends UIComponent {
    readonly options: string[];
    setOptions(options: string[]): this;

    readonly selected: number;
    setSelected(selected: number): this;

    readonly onAction: (option: string, index: number) => void;
    setOnAction(onAction: (option: string, index: number) => void): this;
}

export interface UIInputField extends UIComponent {
    readonly placeholder: string;
    setPlaceholder(placeholder: string): this;

    readonly onAction: (text: string) => void;
    setOnAction(onAction: (text: string) => void): this;
}

export interface UIInputArea extends UIComponent {
    readonly placeholder: string;
    setPlaceholder(placeholder: string): this;

    readonly onAction: (text: string) => void;
    setOnAction(onAction: (text: string) => void): this;
}

// window
export interface WindowCVMaker {
    cvmaker: CVMaker;
}

export const cvmaker = window.cvmaker;
