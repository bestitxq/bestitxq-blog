/*
 * Solo - A small and beautiful blogging system written in Java.
 * Copyright (c) 2010-present, b3log.org
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
/**
 * Created by Let Aurn IV on 22/09/2015.
 */

/*global  $*/

Notification = window.Notification || {};

Notification = function () {

    'use strict';

    var number = 0;
    var incPosition = 0;

    var template = function (title, text, image, position) {
        incPosition = number * 120;
        number = number + 1;
        var textHtml = '<div class="text">' + text + '</div>';
        var titleHtml = (!title ? '' : '<div class="title">' + title + '</div>');
        var imageHtml = (!image ? '' : '<div class="illustration"><img src="' + image + '" width="70" height="70" /></div>');
        var style;
        switch (parseInt(position, 10)) {
            case 1:
                style = "top:" + incPosition + "px; left:20px;";
                break;
            case 2:
                style = "top:" + incPosition + "px; right:20px;";
                break;
            case 3:
                style = "bottom:" + incPosition + "px; right:20px;";
                break;
            case 4:
                style = "bottom:" + incPosition + "px; left:20px;";
                break;
            default:
                ;
        }
        // tada 标识抖动效果
        return {
            id: number,
            content: '<div class="notification notification-' + number + ' tada" style="' + style + '">' +
                // '<div class="dismiss">&#10006;</div>' +
                imageHtml +
                '<div class="text">' + titleHtml + textHtml + '</div>' +
                '</div>'
        };
    };

    var hide = function (id) {
        $(document).find('.notification-' + id).remove();
        number = number - 1;
    };

    var create = function (title, text, image, animation, position, delay) {
        var notification = template(title, text, image, position);
        $(notification.content).addClass('animated ' + animation).appendTo('body');
        if (!delay) {
            delay = 2;
        }
        setTimeout(function () {
            hide(notification.id);
        }, 1000 * delay);
    };

    return {
        create: create
    };

}();
