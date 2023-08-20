# Question

"Добрий день. Чи можете на прикладі показати як при отриманні даних з
однієї колекції для деяких полів її отримати дані по ID з іншої колекції?
Наприклад у нас є перелік продуктів, які описуються схемою

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, ""Product name is required""]
  },
  brand: {
    type: String,
    required: [true, ""Brand is required""]
  },
  price: {
    type: Number,
    required: [true, ""Size is required""]
  },
  producingCountry: {
    type: Schema.Types.ObjectId,
    ref: 'country'
  }
})

І є країни-виробники

const countrySchema = new Schema({
  ua: {
    type: String,
    required: [true, ""Country in Ukraine is required""]
  },
  en: {
    type: String,
    required: [true, ""Country in English is required""]
  },
  code: {
    type: String,
    required: [true, ""Code of country is required""],
    unique: true
  }
});

Як при отриманні списку всіх продуктів отримати для кожного з них
дані про країну-виробника за її ID?

Ми хочемо отримати перелік даних про всі продукти. Кожен продукт - це об'єкт
і деякі з цих полів беруться з іншої колекції об'єктів, зі своїми даними і ID.
Питання в тому, як зробити так, щоб для кожного з продукту в дане поле підтягувався
елемент з відповідний ID з іншої колекції (За зразком SQL таблиць)"
