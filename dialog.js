class ConfirmDialog {
    constructor({
        questionText,
        trueButtonText,
        falseButtonText
    }) {
        this.questionText = questionText || 'Are you sure?';
        this.trueButtonText = trueButtonText || 'Yes';
        this.falseButtonText = falseButtonText || 'No';
    
        this.dialog = undefined;
        this.trueButton = undefined;
        this.falseButton = undefined;
        this.parent = document.body;
    
        this._createDialog();
        this._appendDialog();
    }
    _createDialog() {
        this.dialog = document.createElement("dialog");
        this.dialog.classList.add("confirm-dialog");
    
        const question = document.createElement("div");
        question.textContent = this.questionText;
        question.classList.add("confirm-dialog-question");
        this.dialog.appendChild(question);
    
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("confirm-dialog-button-group");
        this.dialog.appendChild(buttonGroup);

        this.trueButton = document.createElement("button");
        this.trueButton.classList.add(
          "confirm-dialog-button",
          "confirm-dialog-button--true"
        );
        this.trueButton.type = "button";
        this.trueButton.textContent = this.trueButtonText;
        buttonGroup.appendChild(this.trueButton);
    
        this.falseButton = document.createElement("button");
        this.falseButton.classList.add(
          "confirm-dialog-button",
          "confirm-dialog-button--false"
        );
        this.falseButton.type = "button";
        this.falseButton.textContent = this.falseButtonText;
        buttonGroup.appendChild(this.falseButton); 
    }
    
    _appendDialog() {
        this.parent.appendChild(this.dialog);
    }
    
    _destroy() {
        this.parent.removeChild(this.dialog);
        delete this;
    }  
    confirm() {
        return new Promise((resolve, reject) => {
            const somethingWentWrongUponCreation = 
                !this.dialog || !this.trueButton || !this.falseButton;
            if (somethingWentWrongUponCreation) {
                reject("Something went wrong upon modal creation");
            }
        
            this.dialog.showModal();
        
            this.trueButton.addEventListener("click", () => {
                resolve(true);
                this._destroy();
            });
        
            this.falseButton.addEventListener("click", () => {
                resolve(false);
                this._destroy();
            });
        });
    }
}