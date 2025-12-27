function getThemeModel() {
  const db = require("../_helpers/db.js");
  return db.Theme;
}

async function createTheme(data) {
  const Theme = getThemeModel();
  return await Theme.create(data);
}

async function getAllThemes() {
  const Theme = getThemeModel();
  const themes = await Theme.findAll();
  return themes.map(t => ({
    id: t.id,
    theme: t.theme,
    image: t.image,
    created: t.created,
    updated: t.updated,
  }));
}

async function deleteThemeById(id) {
  const Theme = getThemeModel();
  const theme = await Theme.findByPk(id);
  if (!theme) throw "Theme not found";
  await theme.destroy();
}

async function updateThemeById(id, data) {
  const Theme = getThemeModel();
  const theme = await Theme.findByPk(id);
  if (!theme) throw "Theme not found";
  await theme.update(data);
  return theme;
}

module.exports = {
  createTheme,
  getAllThemes,
  deleteThemeById,
  updateThemeById,
};
