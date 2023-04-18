import { comments } from "./comments.js";
import { addForm } from "./add-form.js";
// Функции либо общие, либо не относящиеся ни к какому объекту.


comments.render(1);//Заглушка на комментариях
addForm.addListeners(); //Добавляю обработчики событий на форму
comments.get();// Получаем с сервера и отрисовываем