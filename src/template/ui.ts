import * as api from "@/api/CVMaker";

export class MainUI extends api.UI {
    getComponents(): api.UIComponent[] {
        const defaultValue = 5;
        
        const label = this.text(`Value: ${defaultValue}`);
        const slider = this.slider(0, 10, defaultValue, 1, (v) => {
            label.setText(`Value: ${v}`).update();
        });

        return [
            this.cols(
                label,
                slider,
                label,
            ),
        ];
    }
}
