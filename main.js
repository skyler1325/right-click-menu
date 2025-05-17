// Define the custom event block
PenguinMod.defineBlock({
  opcode: "customRightClickAction",
  blockType: PenguinMod.BlockType.EVENT,
  text: "when [ACTION] is selected",
  arguments: {
    ACTION: {
      type: PenguinMod.ArgumentType.STRING,
      defaultValue: "custom action"
    }
  }
});

// Register the block to handle execution when triggered
PenguinMod.registerEvent("customRightClickAction", (args, util) => {
  const actionName = args.ACTION;
  console.log(`Executing action: ${actionName}`);
  executeUserDefinedAction(actionName);
});

// Define block for triggering custom actions manually
PenguinMod.defineBlock({
  opcode: "triggerCustomRightClickAction",
  blockType: PenguinMod.BlockType.COMMAND,
  text: "trigger [ACTION]",
  arguments: {
    ACTION: {
      type: PenguinMod.ArgumentType.STRING,
      defaultValue: "custom action"
    }
  }
});

// Register the trigger block to invoke the custom event
PenguinMod.registerCommand("triggerCustomRightClickAction", (args, util) => {
  executeUserDefinedAction(args.ACTION);
});

// Modify the right-click menu to include user-defined actions
document.addEventListener("contextmenu", function(e) {
  if (e.target.closest(".penguinmod-workspace")) {
    e.preventDefault();
    closeExistingMenu();
    createCustomMenu(e.pageX, e.pageY);
  }
});

function createCustomMenu(x, y) {
  const menu = document.createElement("div");
  menu.classList.add("custom-context-menu");
  menu.style.top = `${y}px`;
  menu.style.left = `${x}px`;

  // Retrieve user-defined actions
  const actions = getUserDefinedActions();

  actions.forEach(action => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");
    menuItem.textContent = action.name;
    menuItem.addEventListener("click", () => {
      executeUserDefinedAction(action.name);
      menu.remove();
    });

    menu.appendChild(menuItem);
  });

  document.body.appendChild(menu);
}

function closeExistingMenu() {
  const oldMenu = document.querySelector(".custom-context-menu");
  if (oldMenu) oldMenu.remove();
}

// Store user-defined actions dynamically
function getUserDefinedActions() {
  return [
    { name: "Custom Action 1", code: "console.log('Action 1 executed');" },
    { name: "Custom Action 2", code: "console.log('Action 2 executed');" }
  ];
}

// Execute user-defined code safely
function executeUserDefinedAction(actionName) {
  const action = getUserDefinedActions().find(a => a.name === actionName);
  if (action) {
    try {
      eval(action.code); // Be cautious with eval; consider safer alternatives
    } catch (error) {
      console.error("Error executing custom action:", error);
    }
  }
}

// Add custom styling for the menu
const style = document.createElement("style");
style.innerHTML = `
  .custom-context-menu {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 5px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    z-index: 1000;
  }
  .menu-item {
    padding: 5px;
    cursor: pointer;
  }
  .menu-item:hover {
    background: #f0f0f0;
  }
`;
document.head.appendChild(style);
