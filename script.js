class HUMAN {
    constructor(obj) {
        this.name = obj.name;
        this.gendor = obj.gendor;
    }
}
class WOMAN extends HUMAN {
    constructor(obj) {
        super(obj)
        this.gendor = 'Ж';
    }
}
class MAN extends HUMAN {
    constructor(obj) {
        super(obj)
        this.gendor = 'М'
    }
}
const human = new HUMAN({
    name: 'Имя',
    gendor: 'Пол'
})
const woman = new WOMAN({
    name: 'Имя'
})
const man = new MAN({
    name: 'Имя'
})
console.log(human);
console.log(woman);
console.log(man);


class SCROLL {
    constructor(set) {
        // 
        if (typeof set.el == 'string') { /* Проверяем на строку */
            this.el = document.querySelector(set.el); /* Если строка то через document.querySelector() делаем поключение и присваеваем к переменной this.el */
        } else if (set.el instanceof HTMLElement) { /* Проверяем принадлежит ли элемент Объекту HTMLElemrnt */
            this.el = set.el /* Если принадлежит Объекту HTMLElemrnt то присваеваем в переменную this.el */
        }
        this.top = set.top; /* присваеваем данные отступа взяты из объекта set */
        this.el.style.position = 'fixed'; /* делаем у элемента position: fixed; */
        this.el.style.top = this.scroll(); /* Вызваем прототип (метод) объекта scroll() который делает вычисления связаны с единицей измерением */

        this.unit = set.unit; /* создаем переменную this.unit (единица измерения) и присваеваем ем данные полученные из объекта set */

        window.addEventListener('scroll', () => this.scroll()) /* на окно браузера вешаем событие скрола и если скрол происходит то вызывается прототип (метод) объекта SCROLL this.scroll() он делает изменение сдвига меню от верха экрана */
        window.addEventListener('resize', () => this.scroll()) /* на окно браузера вешаем событие изменение размера */
    }
    scroll() { /* прототип (метод) scroll() */

        this.window = this.scrollNumber(); /* берем данные вычеслинные прототипом (методом) this.scrollNumber() */

        // pageYOffset - берет растояние от верха до скрола
        if (this.window - pageYOffset > 0) { // Если высота заданная в инстансе объекта минус высота от верха до скрола (this.window - pageYOffset) будет больше 0
            //  this.window - данные равны отступа от верха экрана
            // Высота заданная в инстансе объекта минус высота от верха до скрола (this.window - pageYOffset)
            this.el.style.top = this.window - pageYOffset + 'px'
        } else { // Если высота заданная в инстансе объекта минус высота от верха до скрола (this.window - pageYOffset) будет равна 0
            this.el.style.top = 0;
        }
    }
    scrollNumber() { /* прототип (метод) scrollNumber() делает вычисления обрабатывая единицу измерения */
        /* Проверяем какая еденица измерения*/
        if (this.unit == 'px') { /* Если единица измерения пиксели то метод отдает высоту */

            return this.top >= 0 ? this.top : 0; /* Если высота больше 0 то отдается this.top |  если 0 или меньше от одает 0 */

        } else if (this.unit == '%' || this.unit == undefined) {
            /* Если единица измерения проценты или неопределено от делаем вычисления */
            // ключ объекта элемента clientHeight - отдает высоту элемента
            // window.innerHeight - отдает высоту видемой области браузера
            // прототип (метод) this.calc() - делает вычисление (из 100 процентов (высоту видемой области браузера) вычисляет размер Например из 1000 пикселей вычислет сколько будет 20% = 200пикселей )
            return this.calc(window.innerHeight, this.top) - this.el.clientHeight;

        }
    }
    calc(height, top) {
        // height высота видимой облости браузера
        // top проценты
        return height / 100 * top; /* отдает ответ сколько будет 
            например высота видемой области браузера 1000 пикселей
            проценты от высоты 20
            1000 / 100 * 20 = 200 пикселей
        */
    }
}



const myScroll = new SCROLL(
    { /* Литеральный ОБЪЕКТ. В объекте SCROLL он называется set  */
        el: '.header__nav',
        top: 100,
    }
)
