let SdrUtils = require('SdrUtils')
let ReceptiveField = require('ReceptiveField')

module.exports = () => {
    let $receptiveFieldPercSlider = $('#receptiveFieldPercSlider')
    let $receptiveFieldPercDisplay = $('.receptiveFieldPercDisplay')
    let $inputSpaceDimensionsSlider = $('#inputSpaceDimensionsSlider')
    let $inputSpaceDimensionsDisplay = $('.inputSpaceDimensionsDisplay')

    function getRandomReceptiveField(receptiveFieldPerc, dimensions) {
        let n = dimensions
        let w = parseInt(receptiveFieldPerc * n)
        let potentialPool = SdrUtils.getRandom(n, w)
        return potentialPool
    }

    let drawOptions = {
        width: 600,
        height: 310,
        cellSize: 20,
        rowLength: 28,
    }

    function updateDisplays() {
        sdr.draw(drawOptions)
        $receptiveFieldPercDisplay.html($receptiveFieldPercSlider.val())
        $inputSpaceDimensionsDisplay.html($inputSpaceDimensionsSlider.val())
    }

    $receptiveFieldPercSlider.on('input', function () {
        let targetDensity = parseInt(this.value) / 100
        pool = SdrUtils.adjustTo(pool, targetDensity)
        localStorage.setItem('currentPotentialPool', pool)
        sdr = new ReceptiveField(pool, 'receptiveFieldDemo')
        updateDisplays()
    });

    $inputSpaceDimensionsSlider.on('input', function () {
        pool = getRandomReceptiveField(
            parseInt($receptiveFieldPercSlider.val()) / 100,
            parseFloat($inputSpaceDimensionsSlider.val())
        )
        localStorage.setItem('currentPotentialPool', pool)
        sdr = new ReceptiveField({bits}, 'receptiveFieldDemo')
        updateDisplays()
    });

    let pool = getRandomReceptiveField(
        parseInt($receptiveFieldPercSlider.val()) / 100,
        parseFloat($inputSpaceDimensionsSlider.val())
    )
    localStorage.setItem('currentPotentialPool', pool)
    let sdr = new ReceptiveField(pool, 'receptiveFieldDemo')
    updateDisplays()
}