export const closeDrawer = () => {
    const drawer =
        document.getElementById("auth-drawer");

    if (drawer) {
        drawer.checked = false;
    }
};

export const openDrawer = () => {
    const drawer =
        document.getElementById("auth-drawer");

    if (drawer) {
        drawer.checked = true;
    }
};