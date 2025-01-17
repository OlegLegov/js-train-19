// 1. Створення базового об'єкту "Book":
/*
 * Об'єкт: Book
 * Властивості:
 * ----------------------------------
 * | Властивість | Значення         |
 * |-------------|------------------|
 * | title       | "Загальна Книга" |
 * | author      | "Анонім"         |
 * | pages       | 0                |
 *
 * Функції:
 * ------------------------------------------------------------------------
 * | Функція    | Опис                                                    |
 * -----------------------------------------------------------------------
 * | read()     | Виводить повідомлення "Ви читаєте <title> від <author>" |
 */

// Створюємо об'єкт Book
let Book = {
  title: "Загальна Книга",
  author: "Анонім",
  pages: 0,
  read() {
    console.log(`Ви читаєте ${this.title} від ${this.author}`);
  },
};

console.log("Завдання: 1 ==============================");

// Виводимо в консоль Об'єкт: Book
console.log(Book);
// Виводимо в консоль прототип Об'єкту: Book
console.log(Object.getPrototypeOf(Book));
// Викликаємо функцію read об'єкту Book
Book.read();

// 2. Наслідування від базового об'єкту Book

/*
 * Об'єкт: Novel
 * Властивості та функції наслідуються від об'єкта Book
 * Додаємо нову властивість
 *  | Властивість | Значення |
 *  |-------------|----------|
 *  | genre       | "Новела" |
 */

// Створюємо об'єкт Novel, наслідуємо властивості і функції від об'єкта Book

// Додаємо властивість genre

// Створюємо об'єкт Novel, наслідуємо властивості і функції від об'єкта Book
let Novel = Object.create(Book);

// Додаємо властивість genre
Novel.genre = "Новела";

console.log("Завдання: 2 ==============================");

// Виводимо в консоль Об'єкт: Novel
console.log(Novel);
// Виводимо в консоль прототип Об'єкту: Novel
console.log(Object.getPrototypeOf(Novel));

// 3. Створення нового об'єкту та зміна його прототипу

/*
 * Об'єкт: Biography
 * Властивості:
 * --------------------------------------
 * | Властивість | Значення             |
 * |-------------|----------------------|
 * | title       | "Загальна Біографія" |
 * | author      | "Біограф"            |
 * | pages       | 200                  |
 */

// Створюємо об'єкт Biography

// Змінемо прототип об'єкта Biography на Novel

// Створюємо об'єкт Biography
let Biography = {
  title: "Загальна Біографія",
  author: "Біограф",
  pages: 200,
};

// Змінюємо прототип об'єкта Biography на Novel
Object.setPrototypeOf(Biography, Novel);

console.log("Завдання: 3 ==============================");
// Виводимо в консоль Об'єкт: Biography
console.log(Biography);
// Перевіримо чи являється Novel прототипом Biography та виведемо в консоль
console.log(Object.getPrototypeOf(Biography) === Novel);

// 4. Інкапсуляція властивості та додання властивості
/*
 * Об'єкт: ScienceBook
 * Властивості та функції наслідуються від об'єкта Book
 * Також тут використовується інкапсуляція для створення властивості 'info', яка не може бути змінена напряму, а лише змінюється за допомогою гетера
 */

// Створюємо ScienceBook, наслідуємо властивості і функції від об'єкта Book

// Додаємо властивість 'info' за допомогою Object.defineProperty
// Зробимо щоб 'info' не можно було видалити або змінити, перевіримо і спробуємо присвоїти ій будь яке значення (це потрібно робити ззовні defineProperty),
// Отримаємо помилку Cannot assign to read only property 'info' of object '#<Object>'

// Далі створюємо сетер який присвоє властивості info значення яке отримує при виклику, помилку більше не отримуємо але при спробі вивести значення info отримуємо undefined

// Створимо гетер який буде нам повертати рядок: Про книгу <title>: <info>
// тепер все виводить коректно

// Заповнюємо об'єкт
// | Властивість | Значення             |
// |-------------|----------------------|
// | title       | "Фізика 101"         |
// | author      | "Альберт Ейнштейн"   |
// | info        | написана в 1915 році |

// Створити об'єкт ScienceBook, наслідувати властивості і функції від об'єкта Book
let ScienceBook = Object.create(Book, {
  title: { value: "Фізика 101", writable: true, enumerable: true },
  author: { value: "Альберт Ейнштейн", writable: true, enumerable: true },
  info: {
    get() {
      return `Про книгу ${this.title}: ${this._info}`;
    },
    set(value) {
      Object.defineProperty(this, "_info", {
        value: value,
        writable: true,
        configurable: false,
        enumerable: false,
      });
    },
    enumerable: true,
    configurable: false,
  },
});

// Присвоїти значення info
ScienceBook.info = "написана в 1915 році";

console.log("Завдання: 4 ==============================");
// Виводимо в консоль властивість info
console.log(ScienceBook.info); // Про книгу Фізика 101: написана в 1915 році
// Виводимо в консоль налаштування властивости info
console.log(Object.getOwnPropertyDescriptor(ScienceBook, "info"));

// 5. Поліморфізм: створення нового об'єкта та перевизначення його методу
/*
 * Об'єкт: Textbook
 * Властивості та функції наслідуються від об'єкта ScienceBook
 * Метод read() перевизначено для демонстрації поліморфізму,
 * має виводити "Ви читаєте підручник "<title>" від <author>. <info>"
 */

//Створюємо Textbook та наслідуємо властивості з ScienceBook

// Перевизначаємо метод read(), відповідно з дописом вище

// Встановлюємо значення для Textbook
// | Властивість | Значення                   |
// |-------------|----------------------------|
// | title       | "Фізика у Вищій Школі"     |
// | author      | "Дж. Д. Джонс"             |

// Створити об'єкт Textbook, наслідувати властивості і функції від об'єкта ScienceBook
let Textbook = Object.create(ScienceBook);

// Встановити значення для Textbook
Textbook.title = "Фізика у Вищій Школі";
Textbook.author = "Дж. Д. Джонс";
Textbook.info = "корисний для студентів";

// Перевизначити метод read() для Textbook
Textbook.read = function () {
  console.log(
    `Ви читаєте підручник "${this.title}" від ${this.author}. ${this.info}`
  );
};

console.log("Завдання: 5 ==============================");
// Викликаємо функцію read об'єкту Textbook
Textbook.read(); // Ви читаєте підручник "Фізика у Вищій Школі" від Дж. Д. Джонс. Про книгу Фізика у Вищій Школі: корисний для студентів

// 6. Абстракція: створення об'єкта з загальними властивостями
/*
 * Об'єкт: Media
 * Властивості:
 * --------------
 * | Властивість | Значення           |
 * |-------------|--------------------|
 * | format      | "Загальний Формат" |
 * | length      | 0                  |
 *
 * Функції:
 * ---------------------------------------------------------------------------------------------------------------
 * | Функція | Опис                                                                                              |
 * |---------|---------------------------------------------------------------------------------------------------|
 * | play()  | Виводить повідомлення "Зараз відтворюється медіа у форматі <format> з тривалістю <length> секунд" |
 */

// Створюємо об'єкт Media

/*
 * Об'єкт: Song
 * Властивості та функції наслідуються від об'єкта Media
 * Додаткові властивості: artist, title
 */

// Створюємо об'єкт Song, наслідуємо властивості і функції від об'єкта Media

// Встановлюємо додаткові властивості
// | Властивість | Значення               |
// |-------------|------------------------|
// | artist      | "Загальний Виконавець" |
// | title       | "Загальна Пісня"       |

// Створити об'єкт Media
let Media = {
  format: "Загальний Формат",
  length: 0,
  play() {
    console.log(
      `Зараз відтворюється медіа у форматі ${this.format} з тривалістю ${this.length} секунд`
    );
  },
};

// Створити об'єкт Song, наслідувати властивості і функції від об'єкта Media
let Song = Object.create(Media, {
  artist: { value: "Загальний Виконавець", writable: true, enumerable: true },
  title: { value: "Загальна Пісня", writable: true, enumerable: true },
});

// Встановити додаткові властивості для Song
Song.format = "Аудіо";
Song.length = 180; // тривалість у секундах

console.log("Завдання: 6 ==============================");
// Викликаємо функцію play об'єкту Song
Song.play(); // Зараз відтворюється медіа у форматі Аудіо з тривалістю 180 секунд
// Вивести властивості об'єкта Song
// console.log(`Title: ${Song.title}`); // Загальна Пісня
// console.log(`Artist: ${Song.artist}`); // Загальний Виконавець
