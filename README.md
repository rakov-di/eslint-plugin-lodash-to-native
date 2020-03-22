# Домашка по тулингу. Плагин для ESLint

## Описание <a name="#about"></a>

При разработке использовались:
- eslint - 6.8.0
- mocha - 7.1.1

Создан плагин с правилом, которое находит в js-файлах вызовы функций вида `_.map(collection, fn)`. 
При запуске eslint с флагом `--fix` происходит следующее:
- если `collection` является объектом - ничего не происходит
- если найденная функция находится внутри условного оператора, проверяющего, является ли `collection` массивом - ничего не происходит
    ```js
    Array.isArray(collection) ? collection.map(fn) : _.map(collection,fn);
    ```
    ```js
    if (Array.isArray(collection)) {
          collection.map(fn);
        }
        else {
          _.map(collection,fn);
        }
    ```
- если `colection` является массивом - плагин заменяет всю конструкцию на нативный js `collection.map(fn)`
- в остальных случаях плагин заменяет исходную функцию на условие:
    ```js
    Array.isArray(collection) ? collection.map(fn) : _.map(collection,fn);
    ```

Проверки на то, чем является `_` и присутствует ли он(а) в текущей или глобальной области видимости нет. Переопределение `_` в коде никак не обрабатывается.

## Установка <a name="#install"></a>

Установите [ESLint](http://eslint.org/):

```bash
npm i -D eslint
```

Установите плагин с правилом `lodash-to-native`:

```bash
npm i -S https://github.com/rakov-di/eslint-plugin-lodash-to-native
```

## Использование <a name="#use"></a>

Добавьте плагин `lodash-to-native` в блок `plugin` в вашем файле с конфигурацией ESLint `.eslintrc.js`. Можно опустить префикс `eslint-plugin-`:
```
{
  "plugins": [
    "lodash-to-native"
  ]
}
```

В блоке `rules` укажите правило, которое хотите подключить:
```
{
  "rules": {
    "lodash-to-native/map": "warn"
  }
}
```

При следующей проверки ESLint-ом правило должно работать.

## Поддерживаемые правила <a name="#rules"></a>

lodash-to-native/map


## Для разработчиков <a name="#developers"></a>

Для работы с иходным кодом скачайте репозиторий и перейдите в него:
```bash
git clone https://github.com/MOTORIST/eslint-plugin-lodash-to-native#installation
cd eslint-plugin-lodash-to-native
```

Установите необходимые npm-пакеты:
```bash
npm install
```

Для запуска тестов наберите:
```bash
npm test
```
