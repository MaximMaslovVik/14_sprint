# 14_sprint
Проектная работа 14
Реализуем аутентификацию и авторизацию в проекте Mesto.
1. Добавьте email и password к схеме пользователя
Регистрировать пользователей будем по почте и паролю. Поэтому в схему пользователя добавьте два поля: email и password. У каждого пользователя email должен быть уникальным и валидироваться на соответствие схеме электронной почты.
При валидации вам поможет модуль validator. По умолчанию база возвращает поле password при запросе к модели пользователя. Пока не меняйте — вернёмся к этому позже.
2. Переработайте контроллер createUser
Он должен добавлять поля email и password, помимо тех полей, что он уже добавляет name, about и avatar. Пароль хешируйте, прежде чем сохранять в базу.
Данные всех полей должны приходить в теле запроса.
3. Создайте контроллер login
В файле controllers/users.js создайте контроллер login, который получает из запроса почту и пароль и проверяет их. Если почта и пароль правильные, контроллер должен создавать JWT сроком на неделю. В пейлоуд токена следует записывать только свойство _id, содержашее идентификатор пользователя:
{
    _id: "d285e3dceed844f902650f40"
}
JWT после создания должен быть отправлен клиенту. Мы рекомендуем записывать JWT в httpOnly куку. Но, если вам проще сделать это в теле ответа, сделайте так, такое решение тоже будет принято.
Если присланы неправильные почта и пароль, контроллер должен вернуть ошибку 401.
4. Создайте роут для логина и регистрации
В app.js создайте два обработчика POST-запросов на два роута: '/signin' и '/signup':
app.post('/signin', login);
app.post('/signup', createUser);
Передайте им соответствующие контроллеры — login и createUser. Из файла routes/users.js удалите обработчик создания пользователя — он больше не нужен.
5. Сделайте мидлвэр для авторизации
В файле middlewares/auth.js создайте мидлвэр для авторизации. Он должен верифицировать токен из заголовков. Если с токеном всё в порядке мидлвэр должен добавлять пейлоуд токена в объект запроса и вызывать next:
req.user = payload;
next();
Если с токеном что-то не так, мидлвэр должен вернуть ошибку 401.
6. Защитите API авторизацией
Защитите авторизацией все маршруты, кроме создания нового пользователя и логина.
7. Удалите хардкод
В самостоятельном задании предыдущего спринта, мы добавили такой мидлвэр, поскольку тогда мы ещё рассказывали, как реализовать авторизацию:
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133'
  };

  next();
});
Теперь авторизация готова, поэтому удалите этот мидлвэр.
8. Проконтролируйте права
У пользователя не должно быть возможности удалять карточки других пользователей. Если вы сделали дополнительное задание в предыдущей самостоятельной работе, проследите также, что пользователи не могут редактировать чужие профили.
9. Сделайте так, чтобы API не возвращал хеш пароля
В соответствующее поле схемы пользователя нужно добавить свойство select со значением false:
const userSchema = new Schema({
  // ...
  password: {
    type: String,
    required: true,
    select: false // необходимо добавить поле select
  },
  // ...
});
Так по умлочанию хеш пароля пользователя не будет возвращаться из базы.
Но в случае аутентификации хеш пароля нужен. Чтобы это реализовать, после вызова метода модели, нужно добавить вызов метода select, передав ему строку +password:
User.findOne({ email }).select('+password')
  .then((user) => {
    // здесь в объекте user будет хеш пароля
  });
Примерная структура проекта
Структура проекта должна выглядеть как-то так:
image
Обратите внимание: в коде нет env-файла. Мы добавим его потом, когда загрузим проект на сервер. Секретный ключ для разработки можно хранить в коде, это не страшно.
Проверьте проект по чеклисту
в схеме пользователя есть обязательные email и password;
поле email уникально и валидируется;
в контроллере createUser почта и хеш пароля записываются в базу;
есть контроллер login, он проверяет, полученные в теле запроса почту и пароль;
если почта и пароль верные, контроллер login создаёт JWT, в пейлоуд которого записано свойство _id с идентификатором пользователя; срок жизни токена — 7 дней;
если почта и пароль верные, контроллер login возвращает созданный токен в ответе;
если почта и пароль не верные, контроллер login возвращает ошибку 401;
в app.js есть обработчики POST-запросов на роуты /signin и /signup;
есть файл middlewares/auth.js, в нём мидлвэр для проверки JWT;
при правильном JWT авторизационный мидлвэр добавляет в объект запроса пейлоуд и пропускает запрос дальше;
при неправильном JWT авторизационный мидвэр возвращает ошибку 401;
все роуты, кроме /signin и /signup, защищены авторизацией;
удалён хардкод req.user из самостоятельного проекта предыдущего спринта;
пользователь не может удалить карточку, которую он не создавал;
API не возвращает хеш пароля;
