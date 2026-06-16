/** Bump after in-game patch testing. */
export const FREE_FIRE_TESTED_VERSION = "OB53";

/** Updated frequently — edit cells after in-game patch testing. */
export const FF_MAX_SYNC_TABLE = [
  {
    aspect: "Profile Name Sync",
    freeFire: "Same account, shared name (pending verification)",
    freeFireMax: "Synced automatically (pending verification)",
  },
  {
    aspect: "Character Limit",
    freeFire: "20 (pending verification)",
    freeFireMax: "20 (pending verification)",
  },
  {
    aspect: "Font Rendering",
    freeFire: "Baseline (pending verification)",
    freeFireMax:
      "⚠️ Some fonts render slightly larger (pending verification)",
  },
  {
    aspect: "Guild Tag Sync",
    freeFire: "Shared (pending verification)",
    freeFireMax: "Shared (pending verification)",
  },
  {
    aspect: "Login Method Required",
    freeFire: "Standalone or linked (pending verification)",
    freeFireMax: "Must link to FF account (pending verification)",
  },
] as const;

/** Updated frequently — edit after guild/profile field testing. */
export const FF_NAME_FIELD_TABLE = [
  {
    rule: "Character limit",
    profileName: "20 (pending verification)",
    guildName: "25 (pending verification)",
  },
  {
    rule: "Rename cost",
    profileName: "390 💎 or Rename Card (pending verification)",
    guildName: "500 💎 or Guild Rename Card (pending verification)",
  },
  {
    rule: "Unicode font support",
    profileName: "Broad — most math Unicode blocks (pending verification)",
    guildName:
      "Narrower — long styled strings often truncate (pending verification)",
  },
  {
    rule: "Border symbols (꧁ ☬ ꧂)",
    profileName: "Usually renders (pending verification)",
    guildName: "May crowd small guild UI (pending verification)",
  },
  {
    rule: "Who can edit",
    profileName: "Account owner (pending verification)",
    guildName: "Guild leader only (pending verification)",
  },
] as const;

/** Styles/symbols that commonly show as boxes in FF — pending live verification. */
export const FF_BROKEN_SYMBOLS = [
  {
    item: "Squared letters",
    example: "🅂🅀🅄🄰🅁🄴🄳",
    status: "Often shows boxes — marked ⚠️ in generator (pending verification)",
  },
  {
    item: "Strikethrough combining mark",
    example: "S̶t̶r̶i̶k̶e̶",
    status: "Combining chars fail in FF name field (pending verification)",
  },
  {
    item: "Underline combining mark",
    example: "U̲n̲d̲e̲r̲",
    status: "Invisible joiners break validation (pending verification)",
  },
  {
    item: "Upside-down flip",
    example: "ɹǝʌo",
    status: "Mixed rendering across Android builds (pending verification)",
  },
  {
    item: "Stacked emoji + fraktur",
    example: "🔥𝕱𝖎𝖗𝖊🔥",
    status: "Emoji width varies on MIUI / older devices (pending verification)",
  },
  {
    item: "Fullwidth Latin",
    example: "ＦＦＰＲＯ",
    status: "Counts 2× visual width in lobby (pending verification)",
  },
] as const;
