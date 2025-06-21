const menuItems = [];

export default {
  addMenuItem(args) {
    const { LABEL, ICON, CODE } = args;
    menuItems.push({ label: LABEL, icon: ICON, code: CODE });
    window._pmContextMenu = menuItems;
    console.log(`✅ Added: ${ICON} ${LABEL}`);
  }
};
