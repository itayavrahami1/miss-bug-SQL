import utilService from './utilService.js'
import storageService from './storageService.js'

const STORAGE_KEY = 'cars'


const gDefaultCars = [_createCar('suzuli', 100), _createCar('lamburnini', 43245)]
var gCars = null
_createCars();

export default {
    query,
    save,
    remove,
    getById
}



function _createCars() {
    gCars = storageService.load(STORAGE_KEY, gDefaultCars)
    storageService.store(STORAGE_KEY, gCars)

}

function _createCar(vendor, price) {
    return {
        vendor,
        price,
        id: utilService.makeId()
    }
}
function save(carToSave) {
    if (carToSave.id) {
        const carIdx = _getIdxById(carToSave.id)
        gCars[carIdx] = carToSave;
        // gCars.splice(carIdx, 1, car)
    } else {
        const newCar = _createCar(carToSave.vendor, carToSave.price)
        gCars.push(newCar)
    }
    storageService.store(STORAGE_KEY, gCars)
}

function query(filterBy) {
    if (!filterBy) return gCars
    else {
        var { vendor, maxPrice, minPrice } = filterBy
        maxPrice = maxPrice ||  Infinity
        minPrice = minPrice || 0
        return gCars.filter(car => car.vendor.includes(vendor)
            && (car.price < maxPrice)
            && car.price > minPrice)
    }
    // return gCars
}
function remove(carId) {
    const carIdx = _getIdxById(carId)
    gCars.splice(carIdx, 1)
    storageService.store(STORAGE_KEY, gCars)

}
function getById(carId) {
    const car = gCars.find(car => car.id === carId)
    return car;
}
function _getIdxById(carId) {
    return gCars.findIndex(car => car.id === carId)
}
