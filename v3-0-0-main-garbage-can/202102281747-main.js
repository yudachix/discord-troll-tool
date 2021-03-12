(function () {
    'use strict';
    function copy(str, useExecCommand) {
        if (!useExecCommand && typeof navigator === 'object' && typeof navigator.clipboard === 'object' &&
            typeof location === 'object' && location.protocol === 'https:') navigator.clipboard.writeText(str).catch(function () {
                copy(str, true);
            });
        else {
            var e = $('<textarea>').val(str).appendTo('body').select();
            try {
                document.execCommand('copy');
            } catch (e) {
                throw e;
            } finally {
                e.remove();
            }
        }
    }
    function makeLink(title, href, noNewTab) {
        var e = $('<a>', {
            href: href
        }).text(title).css('color', '#00b0f4');
        if (!noNewTab) e.attr({
            target: '_blank',
            rel: 'noopener noreferrer'
        });
        return e[0].outerHTML;
    }
    /*function makeEmphasis(str) {
        return $('<span>').text(str).css({
            fontWeight: 'bold',
            color: 'crimson'
        })[0].outerHTML;
    }
    function addSummary(h, html, title) {
        var holder = $('<div>').css({
            padding: '1em',
            maxWidth: '80%',
            display: 'inline-block',
            borderRadius: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.25)'
        }).appendTo(h || 'body');
        if (title) $('<h2>').text(title).css({
            margin: '0px',
            color: 'snow'
        }).appendTo(holder);
        if (html) $('<p>').html(Array.isArray(html) ? html.join('<br>') : html).css({
            fontSize: '12px',
            color: 'lightgray'
        }).appendTo(holder);
        return holder;
    }*/
    function addBtn(h, title, func) {
        return $('<button>').text(title).appendTo(h || 'body').on('click', func);
    }
    function addTab(h, list) {
        
    }
    var h = (function (wrapper, cover, header, h, footer) {
        cover.add(header).add(h).add(footer).appendTo(wrapper);
        $('html, body').add(wrapper).add(cover).css({
            margin: '0px',
            padding: '0px',
            width: '100%'
        });
        $(window).on('resize', function () {
            wrapper.css('padding-bottom', footer[0].offsetHeight + 'px');
        }).trigger('resize');
        return h;
    })(
        $('<div>').css({
            minHeight: '100vh',
            position: 'relative',
            boxSizing: 'border-box'
        }).appendTo('body'),
        $('<div>').css({
            height: '100%',
            top: '0',
            left: '0',
            zIndex: '-1',
            position: 'fixed',
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }),
        $('<div>').css({
            padding: '0.5em',
            whiteSpace: 'nowrap',
            boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 10px 0px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }).append($('<h1>').text($('title').text()).css({
            margin: '0px',
            color: 'white'
        }).add($('<div>').text('Ver.3.0.0 | last update: 2021/02/28').css({
            fontSize: '14px',
            color: 'lightgray'
        })).css({
            lineHeight: '1',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        })),
        $('<div>').css('padding', '1em'),
        $('<div>').css({
            width: '100%',
            bottom: '0px',
            position: 'absolute',
            textAlign: 'center',
            color: 'lightgray',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }).append($('<p>').append($('<span>').text('このWebサイトのコンテンツは').add($(makeLink('MIT License', 'https://github.com')).add($('<span>').text('に基づきます。© Copyright 2021 ')).add($(makeLink('YudachiK2', 'https://github.com/YudachiK2'))))).find('a').css({
            textDecoration: 'none',
            color: 'white'
        }).hover(function (e) {
            $(e.target).css({
                transition: 'color 0.25s',
                color: 'red'
            });
        }, function (e) {
            $(e.target).css('color', 'white');
        }).parent())
    );
    /*addSummary(h, [
        'Tokenを使用したDiscordの荒らしができます。',
        'Tokenの説明、取得方法に関しましては、コチラを参照してください。',
        'また、ご不明な点や改善してほしい点がございましたら、Discordサーバー' + makeLink('荒らし連合', 'https://discord.com/invite/sE3Wkdq') + 'か、同サーバー内メンバー' + makeEmphasis('夕立改二#2068') + 'までお気軽にご連絡ください。',
        '',
        $('<h3>').text('必読').css({ color: 'snow', margin: '0px' })[0].outerHTML + '以下の事項に反する行為を行った場合、Tokenが電話認証要求などによって使用できなくなる可能性があります。',
        '・DMの送信は異なるIPアドレスからであっても1日3回以内にとどめる',
        '・リクエストの送信間隔は0.5秒以上にする',
        '・Tokenのアカウントのパスワードを変えたり、二段階認証をしない',
        '・使用中にIPアドレスなど、通信を変更しない',
        '・同じTokenを複数のIPアドレスから操作しない',
        '・操作ボタンを連打しない',
        '・DMの送信の際はそのTokenの共有者と送信回数を共有する'
    ]);*/
})();
