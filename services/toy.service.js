import fs from "fs";

const dataRoute = "data/toys.json";

export const toyService = {
    query,
    getById,
    remove,
    save
}

function query() {
    const toys = readToysFromFile();
    return Promise.resolve(toys);
}
function getById(toyId) {
    const toys = readToysFromFile();
    const toy = toys.find((toy) => toy.id === toyId)
    return Promise.resolve(toy);
}
function remove(toyId) {
    const toys = readToysFromFile();
    toys.splice(toys.findIndex((toy) => toy.id === toyId), 1)
    _saveToysToFile(toys)
    return Promise.resolve(toys)
}

function save(toy, isEdit) {
    const toys = readToysFromFile();
    if (isEdit) {
        const idx = toys.findIndex(currToy => currToy.id === toy.id)
        toys[idx] = { ...toys[idx], ...toy }
    } else {
        toys.push(toy)
    }
    _saveToysToFile(toys);
    return Promise.resolve(toy);
}

function _saveToysToFile(toys) {
    fs.writeFileSync(dataRoute, JSON.stringify(toys, null, 2));
}

function readToysFromFile() {
    return JSON.parse(fs.readFileSync(dataRoute, 'utf-8'))
}