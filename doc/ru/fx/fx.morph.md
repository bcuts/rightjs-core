# Морфологический эффект

Fx.Morph - это базовый визуальный эффект плавно изменяющий стили элемента
от их текущего значения до любого указанного конечного.

Вы можете указывать любое количество стилей одновременно, все они будут 
обработаны в одном потоке.

__ВНИМАНИЕ__: Нет необходимости специально предустанавливать начальные
значения стилей, в подавляющем большинстве случаев RightJS разберется во всем
сам.

### #start

    start(Object end_style)   -> Fx.Morph self

Получает хэш с конечным стилем и запускает эффект

    new Fx.Morph('element-id').start({
      background: 'yellow',
      fontSize:   '20px'
    });