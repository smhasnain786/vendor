/* eslint-disable import/prefer-default-export */
export const ModelClose = (id) => {
    const closeButton = document.getElementById(id)
    if(closeButton) closeButton.click();
}