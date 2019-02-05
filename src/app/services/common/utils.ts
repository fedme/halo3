export namespace Utils {

    /**
    * Get a copy of an array and randomize the order of its element
    */
    export function getShuffledCopy<T>(array: Array<T>): Array<T> {
        const newArray = array.slice();
        shuffleArray(newArray);
        return newArray;
    }

    /**
    * Randomize array element order in-place.
    * Using Durstenfeld shuffle algorithm.
    */
    export function shuffleArray<T>(array: Array<T>): void {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

}