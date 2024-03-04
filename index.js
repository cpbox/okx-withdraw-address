// 用户输入的逗号分隔数据
let wallet_address_csv = `
era_add_1,0x0d3C2c6e08A07F4FeF5C7e0c134c0000001b650B
era_add_2,0x0d3C2c6e08A07F4FeF5C7e0c134c0000001b650C
era_add_3,0x0d3C2c6e08A07F4FeF5C7e0c134c0000001b650D
era_add_4,0x0d3C2c6e08A07F4FeF5C7e0c134c0000001b650E
era_add_5,0x0d3C2c6e08A07F4FeF5C7e0c134c0000001b650F
era_add_6,0x0d3C2c6e08A07F4FeF5C7e0c134c0000001b651A
era_add_7,0x0d3C2c6e08A07F4FeF5C7e0c134c0000001b652A
era_add_8,0x0d3C2c6e08A07F4FeF5C7e0c134c0000001b653A
era_add_9,0x0d3C2c6e08A07F4FeF5C7e0c134c0000001b654A
era_add_10,0x0d3C2c6e08A07F4FeF5C7e0c134c0000001b650A
`;

// 转换为所需数据结构
let wallet_address = {};
wallet_address_csv
  .trim()
  .split("\n")
  .forEach((line) => {
    let parts = line.split(",");
    wallet_address[parts[0].trim()] = parts[1].trim();
  });

console.log("🎉 成功获取到待输入地址:", wallet_address); // 输出转换后的数据数量

let one_group_count = 20;
let wallet_address_keys = Object.keys(wallet_address);
let wallet_count = wallet_address_keys.length;
let add_count = wallet_count;

if (add_count > one_group_count) {
  add_count = one_group_count;
}

let group_start_index = 0;
if (wallet_count - group_start_index < one_group_count) {
  add_count = wallet_count - group_start_index;
}

let sleep_time = 90;
let chain_table_inputs = undefined;

let add_max = add_count;

let dialogContainer = document.querySelector(".balance_okui-dialog-window");
const title = dialogContainer
  ? dialogContainer.querySelector(".modal-title")
  : null;
const isOpenedDialog =
  title && ["Add a new address", "新增地址"].includes(title.innerText);
let addAddressButton;
if (isOpenedDialog) {
  addAddressButton = dialogContainer.querySelector(".add-address-form-btn");
  // 获取 chain_table_inputs 的引用
  chain_table_inputs = dialogContainer.querySelector(".withdraw-book-list");
} else {
  console.warn("请点击新增提币地址，打开弹出框再执行");
  console.warn("请点击新增提币地址，打开弹出框再执行");
  console.warn("请点击新增提币地址，打开弹出框再执行");
  console.warn("请点击新增提币地址，打开弹出框再执行");
  console.warn("请点击新增提币地址，打开弹出框再执行");
}

// V2 版本，可以正常运行，但在最后一步，需要重新回头输入第一项地址
let current_index = 0;
let intervalId;
function DepositAddressBook_add() {
  if (!addAddressButton) return;

  // 填充当前地址和备注
  let address_index = 3 + current_index * 5;
  let remark_index = 5 + current_index * 5;

  let address_input = chain_table_inputs.querySelector(
    "div:nth-child(" +
      address_index +
      ") > div.balance_okui-form-item-control  input.balance_okui-input-input"
  );
  let remark_input = chain_table_inputs.querySelector(
    "div:nth-child(" +
      remark_index +
      ") > div.balance_okui-form-item-control  input.balance_okui-input-input"
  );

  // 填充地址
  console.log(
    "准备输入地址:",
    wallet_address[wallet_address_keys[current_index + group_start_index]]
  );
  comm_input_value(
    address_input,
    wallet_address[wallet_address_keys[current_index + group_start_index]]
  );
  address_input.dispatchEvent(new Event("input"));

  // 输入备注
  console.log(
    "准备输入备注:",
    wallet_address_keys[current_index + group_start_index]
  );
  comm_input_value(
    remark_input,
    wallet_address_keys[current_index + group_start_index]
  );
  remark_input.dispatchEvent(new Event("input"));

  current_index++;
  add_max--;
  if (add_max === 0) {
    clearInterval(intervalId);
    console.log("✅ 全部输入完毕");
  } else {
    console.log("💪 准备点击添加地址按钮...");
    addAddressButton.click();
  }
}

if (isOpenedDialog) {
  intervalId = setInterval(DepositAddressBook_add, sleep_time);
}

function comm_input_value(elmObj, value) {
  if (!elmObj) {
    console.error("输入元素为空！");
    return;
  }
  elmObj.focus();
  elmObj.setSelectionRange(0, elmObj.value.length);
  document.execCommand("delete", null, false);
  document.execCommand("inserttext", false, value);
}
