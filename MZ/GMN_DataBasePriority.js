//=============================================================================
// GMN_DataBasePriority.js
// ----------------------------------------------------------------------------
// (C)2022 GEMINI
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
/*:
 * @target MZ
 * @plugindesc Sort the database items in the order of priority specified in the memo field.
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_DataBasePriority.js
 * @author GEMINI
 *
 * @help
 * You can sort the display order of the database items in the order of priority specified in the memo field.
 *
 * 1.
 * Describe the priority in the memo field of Items, Skills, Weapons, and Armor as follows.
 * Example description:
 * <priority:100>.
 * The priority tag name ("priority") can be changed in the plugin parameters.
 * The priority value (where "100" is specified) must be a positive integer.
 * 2.
 * Items, skills, weapons, and armor will be displayed in order of priority.
 * Ascending order (1,2,3...) and descending order (1,2,3...) order) and descending order (99999,99998,99997...). is
 * Ascending order (1,2,3...) and descending order (99999,99998,99997...) can be selected by plugin parameters.
 * If the priority is the same, they will be sorted by ID as per the standard specification.
 * 3.
 * If the priority is not set in the memo field,
 * the default priority will be used.
 *
 * [Function for developers]
 * When the plugin parameter "isScriptEnabled" is enabled.
 * Sorting script can be executed from outside the plugin.
 * This is intended for use by scripts and plug-ins.
 * Can be executed non-destructively.
 *
 * [How to use reorder script]
 *
 * "window.<plugin name>.sortByPriority(<sort target>)".
 * Execute.
 *
 * "<plugin name>" is the file name of this plugin minus the extension.
 * "GMN_DataBasePriority" by default.
 *
 * <Sorting Target> is an array of database configuration items represented by $dataXxx, etc.
 * However, each item must have an "id" and "meta" field.
 * Example: $dataEnemies.slice(1)
 * Does not change with script execution.
 *
 * The return value is a sorted array.
 *
 * 2022/02/10 1.0.0 Release
 * 2022/02/10 1.1.0 Added a function for developers
 *
 * @param priorityName
 * @text Name of the priority tag.
 * @desc The name of the tag to describe in the memo field of the database.
 * "priority" by default.
 * @type string
 * @default priority
 *
 * @param asc
 * @text Ascending or descending order of priority.
 * @desc Selects whether the priorities should be in ascending or descending order.
 * In the ascending order, the priorities are ordered as 1,2,3... In the ascending order, the items are sorted in order of 1,2,3....
 * In descending order, the order is 99999,99998,99997...
 * In descending order, the order is 999999,99998,99997...
 * @on ascending order
 * @off descending order
 * @type boolean
 * @default true
 *
 * @param defaultPriority
 * @text default priority
 * @desc Set if priority is not set or is not an integer.
 * Default priority value.
 * @type number
 * @default 100
 * @min 0
 * @max 999999
 * @max 999999
 *
 * @param isScriptEnabled
 * @text [Function for developers] Enable reorder script.
 * @desc If enabled, you can run the reorder script from outside the plugin.
 * @param isScriptEnabled
 * @type boolean
 * @default false
 */
/*:ja
 * @deprecated
 * @target MZ
 * @plugindesc データベースの項目の表示順を、メモ欄で指定した優先度の順に並び替えられます。
 * @base PluginCommonBase
 * @url https://github.com/GEMINIGAMEDEV/RPG-Maker-Plugin/blob/master/MZ/GMN_DataBasePriority.js
 * @author ジェミニ
 *
 * @help
 * データベースの項目の表示順を、メモ欄で指定した優先度の順に並び替えられます。
 *
 * 1.
 * アイテム・スキル・武器・防具 のメモ欄に以下のように優先度を記述します。
 * 記述例:
 * <priority:100>
 * ※優先度のタグ名("priority"の箇所)はプラグインパラメータで変更可能です。
 * ※優先度の値("100"の箇所)は正の整数で記述してください。
 * 2.
 * アイテム・スキル・武器・防具が優先度順に表示されるようになります。
 * 昇順(1,2,3...の順番)と降順(999999,999998,999997...)を
 * プラグインパラメータで選択可能です。
 * 優先度が同じ場合には,、標準仕様通りにID順に並びます。
 * 3.
 * メモ欄に優先度が設定されていない場合に、
 * プラグインパラメータでデフォルトの優先度を設定できます。
 *
 * 【開発者向け機能】
 * プラグインパラメータ "isScriptEnabled" が有効な場合、
 * プラグイン外部から並び替えスクリプトを実行できます。
 * スクリプトやプラグインの利用を想定しています。
 * 非破壊的に実行できます。
 *
 * 【並び替えスクリプト利用方法】
 *
 * "window.<プラグイン名>.sortByPriority(<並び替え対象>)" を
 * 実行します。
 *
 * <プラグイン名>は本プラグインのファイル名から拡張子を除いたものです。
 * デフォルトでは "GMN_DataBasePriority"。
 *
 * <並び替え対象> は$dataXxxなどに代表されるデータベース設定項目の配列です。
 * ただし、各項目は必ず "id" および "meta" のフィールドを持つ必要があります。
 * 例: $dataEnemies.slice(1)
 * スクリプト実行によって変化しません。
 *
 * 返り値は、並び替え済みの配列です。
 *
 * 2022/02/10 1.0.0 公開
 * 2022/02/19 1.1.0 開発者向け機能を追加
 *
 * @param priorityName
 * @text 優先度のタグ名
 * @desc データベースのメモ欄に記述するタグの名称です。
 * デフォルトでは"priority"。
 * @type string
 * @default priority
 *
 * @param asc
 * @text 優先度の昇順or降順
 * @desc 優先度を昇順と降順のどちらにするかを選択します。
 * 昇順の場合には、1,2,3...の順番で並びます。
 * 降順の場合には、999999,999998,999997...
 * の順番で並びます。
 * @on 昇順
 * @off 降順
 * @type boolean
 * @default true
 *
 * @param defaultPriority
 * @text デフォルト優先度
 * @desc 優先度が設定されていない・整数でない場合に設定される
 * 優先度のデフォルト値です。
 * @type number
 * @default 100
 * @min 0
 * @max 999999
 *
 * @param isScriptEnabled
 * @text 【開発者向け機能】並び替えスクリプト有効化
 * @desc 有効にした場合、プラグイン外部から並び替えスクリプトを
 * 実行することができます。
 * @type boolean
 * @default false
 */
"use strict";
{
  const script = document.currentScript;
  const param = PluginManagerEx.createParameter(script);

  const getPriority = (data) => {
    const priorityName = param.priorityName;
    const priority = Number(PluginManagerEx.findMetaValue(data, priorityName));
    return Number.isInteger(priority) ? priority : param.defaultPriority;
  };
  const compareByPriority = (a, b) => {
    if (getPriority(a) === getPriority(b)) {
      return a.id - b.id;
    } else if (param.asc) {
      return getPriority(a) - getPriority(b);
    } else {
      return getPriority(b) - getPriority(a);
    }
  };
  const sortByPriority = (ary) => {
    return ary.slice().sort(compareByPriority);
  };
  if (param.isScriptEnabled) {
    const pluginName = PluginManagerEx.findPluginName(script);
    window[pluginName] = Object.freeze({ sortByPriority: sortByPriority });
  }

  const _Game_Party_weapons = Game_Party.prototype.weapons;
  Game_Party.prototype.weapons = function () {
    return sortByPriority(_Game_Party_weapons.call(this));
  };
  const _Game_Party_armors = Game_Party.prototype.armors;
  Game_Party.prototype.armors = function () {
    return sortByPriority(_Game_Party_armors.call(this));
  };
  const _Game_Party_equipItems = Game_Party.prototype.equipItems;
  Game_Party.prototype.equipItems = function () {
    return sortByPriority(_Game_Party_equipItems.call(this));
  };
  const _Game_Party_items = Game_Party.prototype.items;
  Game_Party.prototype.items = function () {
    return sortByPriority(_Game_Party_items.call(this));
  };
  const _Game_Actor_skills = Game_Actor.prototype.skills;
  Game_Actor.prototype.skills = function () {
    return sortByPriority(_Game_Actor_skills.call(this));
  };
  const _Game_Actor_weapons = Game_Actor.prototype.weapons;
  Game_Actor.prototype.weapons = function () {
    return sortByPriority(_Game_Actor_weapons.call(this));
  };
  const _Game_Actor_armors = Game_Actor.prototype.armors;
  Game_Actor.prototype.armors = function () {
    return sortByPriority(_Game_Actor_armors.call(this));
  };
}
