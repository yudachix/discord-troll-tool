(function () {
    'use strict';
    function copy(str, useExecCommand) {
        if (!useExecCommand && typeof navigator === "object" && typeof navigator.clipboard === "object" &&
            typeof location === "object" && location.protocol === "https:") navigator.clipboard.writeText(str).catch(function () {
                copy(str, true);
            });
        else {
            var e = document.createElement("textarea");
            document.body.appendChild(e);
            e.value = str;
            e.select();
            try {
                document.execCommand("copy");
            } catch (e) {
                throw e;
            } finally {
                document.body.removeChild(e);
            }
        }
    }
    function triggerEvent(elm, event) {
        elm = (elm || document.body);
        if (typeof document.createEvent === "function") {
            var ev = document.createEvent("HTMLEvents");
            ev.initEvent(event, true, true); // event type, bubbling, cancelable
            return elm.dispatchEvent(ev);
        } else return elm.fireEvent("on" + event, document.createEventObject());
    }
    function setStyle(elm, style) {
        elm = (Array.isArray(elm) ? elm : [elm]).map(function (e) {
            return (e || document.body);
        });
        elm.forEach(function (e) {
            Object.keys(style).forEach(function (k) {
                e.style[k.replace(/.\-./g, function (v) {
                    return (v[0] + v[2].toUpperCase());
                }).replace(/\-/g, "")] = style[k];
            });
        });
        return (elm.length === 1 ? elm[0] : elm);
    }
    function makeSpan(html, backColor, color, radius, custom) {
        return ('<span style="' + [
            "word-wrap: break-word; ",
            (backColor === undefined ? "" : "background-color: " + backColor + "; "),
            (color === undefined ? "" : "color: " + color + "; "),
            "border-radius: " + (radius === undefined ? "5" : radius) + "px;",
            (custom === undefined ? "" : " " + custom)
        ].join("") + '">' + (Array.isArray(html) ? html.join("<br>") : html) + "</span>");
    }
    function makeLink(title, href, noNewTab) {
        return ('<a href="' + href + '"' + (!noNewTab ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + title + "</a>");
    }
    function addBreak(h, count) {
        return new Array((count || 1) + 1).join(0).split("").map(function () {
            var e = document.createElement("br");
            (h || document.body).appendChild(e);
            return e;
        });
    }
    function addBtn(h, title, func) {
        var e = document.createElement("button");
        (h || document.body).appendChild(e);
        e.textContent = title;
        e.addEventListener("click", func);
        return e;
    }
    function addInput(h, title, placeholder, readonly) {
        var holder = document.createElement("div"),
            e = document.createElement("input");
        (h || document.body).appendChild(holder);
        holder.textContent = (title + ": ");
        holder.style.color = "lightgray";
        holder.appendChild(e);
    }
    function addTextarea(h, placeholder, readonly) {
        var e = document.createElement("textarea");
        (h || document.body).appendChild(e);
        e.placeholder = placeholder;
        e.readOnly = !!readonly
        setStyle(e, {
            width: "80%",
            height: "3em",
            maxWidth: "80%",
            resize: "none"
        });
        function resize() {
            var placeholderLine = e.placeholder.split("\n").length,
                line = e.value.split("\n").length;
            e.style.height = ((placeholderLine > line && e.value.length === 0 ? placeholderLine : line + 2) + "em");
        }
        ["updatetext", "change", "click"].forEach(function (k) {
            e.addEventListener(k, resize);
        });
        triggerEvent(e, "updatetext");
        if (!!readonly) {
            setStyle(e, {
                tabIndex: "-1",
                cursor: "pointer",
                backgroundColor: "lightgray"
            });
            e.addEventListener("click", function () {
                copy(e.value);
                e.select();
            });
        }
        return e;
    }
    function addTab(h, area) {
        var holder = document.createElement("div"),
            tabs = document.createElement("div");
        (h || document.body).appendChild(holder);
        holder.appendChild(tabs);
        setStyle(tabs, {
            display: "inline-block",
            border: "solid 2.5px rgba(255, 255, 255, 0.75)",
            borderTopRightRadius: "5px",
            borderTopLeftRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.25)"
        });
        var content = document.createElement("div");
        holder.appendChild(content);
        setStyle(content, {
            border: "solid 2.5px rgba(255, 255, 255, 0.75)",
            borderBottomRightRadius: "5px",
            borderBottomLeftRadius: "5px"
        });
        var currentTabName;
        Object.keys(area).forEach(function (k) {
            (function (k) {
                var btn = addBtn(tabs, k, function () {
                    currentTabName = k;
                    Array.prototype.slice.call(tabs.getElementsByTagName("button")).forEach(function (e) {
                        setStyle(e, {
                            color: "lightgray",
                            backgroundColor: "rgba(255, 255, 255, 0.125)"
                        });
                    });
                    setStyle(btn, {
                        color: "black",
                        backgroundColor: "rgba(255, 255, 255, 0.75)"
                    });
                    Array.prototype.slice.call(content.children).forEach(function (e) {
                        e.style.display = "none";
                    });
                    area[k].style.display = "block";
                    triggerEvent(window, "resize");
                });
                setStyle(btn, {
                    padding: "5px 1em 5px 1em",
                    outline: "none",
                    border: "none",
                    borderTopRightRadius: "0px",
                    borderTopLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                    borderBottomLEftRadius: "0px"
                });
            })(k);
            content.appendChild(area[k]);
        });
        tabs.getElementsByTagName("button")[0].click();
        return {
            elm: holder,
            tabs: Object.keys(area),
            getTabName: function () {
                return currentTabName;
            }
        };
    }
    function addSummary(h, html) {
        var holder = document.createElement("div");
        (h || document.body).appendChild(holder);
        setStyle(holder, {
            padding: "1em",
            maxWidth: "80%",
            display: "inline-block",
            borderRadius: "10px",
            fontSize: "12px",
            color: "lightgray",
            backgroundColor: "rgba(255, 255, 255, 0.25)"
        });
        var e = document.createElement("p");
        holder.appendChild(e);
        e.innerHTML = (Array.isArray(html) ? html.join("<br>") : html);
        return holder;
    }
    var logOutput,
        tokenRegExp = /[MNO][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g,
        ajaxTimeoutIds = [],
        area = {},
        logArea = {},
        h = (function (wrapper, header, h, footer) {
            setStyle([document.body.parentNode, document.body], {
                margin: "0px",
                padding: "0px",
                width: "100%",
            });
            setStyle(document.body, {
                backgroundColor: "dimgray",
                backgroundImage: 'url("https://i.imgur.com/gL0pLMn.jpg")',
                backgroundAttachment: "fixed",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            });
            document.body.appendChild(wrapper);
            setStyle(wrapper, {
                minHeight: "100vh",
                position: "relative",
                boxSizing: "border-box",
                backgroundColor: "rgba(0, 0, 0, 0.5)"
            });
            wrapper.appendChild(header);
            setStyle(header, {
                padding: "0.5em",
                wordWrap: "break-word",
                lineHeight: "1",
                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
                backgroundColor: "rgba(0, 0, 0, 0.75)"
            });
            (function (logoHolder, logoImage, logoLabel, headerTitle, versionText) {
                header.appendChild(logoHolder);
                setStyle(logoHolder, {
                    marginRight: "0.5em",
                    marginBottom: "0.5em",
                    float: "left",
                    lineHeight: "0.5",
                    textAlign: "center"
                });
                logoHolder.appendChild(logoImage);
                logoImage.src = "https://i.imgur.com/1gaHHbV.png";
                logoImage.alt = "ヘッダーロゴ";
                setStyle(logoImage, {
                    padding: "0.25em",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 0, 0, 0.25)"
                });
                addBreak(logoHolder);
                logoHolder.appendChild(logoLabel);
                setStyle(logoLabel, {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "white"
                });
                logoLabel.textContent = "AARR";
                header.appendChild(headerTitle);
                setStyle(headerTitle, {
                    margin: "0px",
                    display: "inline-block",
                    color: "white"
                });
                headerTitle.textContent = document.getElementsByTagName("title")[0].textContent;
                addBreak(header);
                header.appendChild(versionText);
                setStyle(versionText, {
                    fontSize: "14px",
                    color: "lightgray"
                });
                versionText.textContent = "Ver.3.0.0 | last update: 2021/02/21";
            })(
                document.createElement("div"),
                document.createElement("img"),
                document.createElement("span"),
                document.createElement("h1"),
                document.createElement("span")
            );
            wrapper.appendChild(h);
            h.style.padding = "1em";
            wrapper.appendChild(footer);
            setStyle(footer, {
                width: "100%",
                bottom: "0",
                position: "absolute",
                textAlign: "center",
                color: "lightgray",
                backgroundColor: "rgba(0, 0, 0, 0.5)"
            });
            (function (e) {
                footer.appendChild(e);
                e.innerHTML = ("このWebサイトのコンテンツは" + makeLink("MIT License", "https://github.com/AARR-JP/aarr-jp.github.io/blob/main/LICENSE") + "に基づきます。&copy; Copyright 2021 " + makeLink("YudachiK2", "https://github.com/YudachiK2"));
                Array.prototype.slice.call(e.getElementsByTagName("a")).forEach(function (e) {
                    setStyle(e, {
                        textDecoration: "none",
                        color: "white",
                    });
                    e.addEventListener("mouseover", function () {
                        setStyle(e, {
                            transition: "color 0.25s",
                            color: "red"
                        });
                    });
                    e.addEventListener("mouseleave", function () {
                        setStyle(e, {
                            transition: "none",
                            color: "white"
                        });
                    });
                });
            })(document.createElement("p"));
            function setPaddingBottom() {
                wrapper.style.paddingBottom = (footer.offsetHeight + "px");
            }
            window.addEventListener("resize", setPaddingBottom);
            setPaddingBottom();
            return h;
        })(
            document.createElement("div"),
            document.createElement("div"),
            document.createElement("div"),
            document.createElement("div")
        );
    ["説明", "基本設定", "生存確認", "レイド", "認証", "発言", "ダイレクトメッセージ", "フレンドリクエスト", "アバター"].forEach(function (k) {
        area[k] = document.createElement("div");
        setStyle(area[k], {
            padding: "1em",
            backgroundColor: "rgba(0, 0, 0, 0.25)"
        });
    });
    var btnHolder = addSummary(h, "");
    btnHolder.innerHTML = "";
    addBreak(h, 2);
    addBtn(btnHolder, "送信キャンセル", function () { }).disabled = true;
    addBtn(btnHolder, "IPアドレスを表示", function (e) {
        e.target.disabled = true;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://ipinfo.io/?callback=a");
        xhr.responseType = "text";
        xhr.onload = function () {
            var m = xhr.response.match(/\{.*?\}/);
            if (!m) return;
            prompt("IPアドレス", JSON.parse(m[0]).ip);
            e.target.disabled = false;
        }
        xhr.send();
    });
    var holder = addTab(h, area).elm;
    addSummary(area["説明"], [
        "Tokenを使用したDiscordの荒らしができます。",
        "Tokenの説明、取得方法に関しましては、" + makeLink(makeSpan("コチラ", "rgba(255, 255, 255, 0.25)"), "https://shunshun94.github.io/shared/sample/discordAccountToken") + "を参照してください。",
        "また、ご不明な点や改善してほしい点がございましたら、Discordサーバー" + makeLink(makeSpan("荒らし連合", "rgba(255, 255, 255, 0.25)"), "https://discord.com/invite/sE3Wkdq") + "か、同サーバー内メンバー" + makeSpan("夕立改二#2068", "rgba(255, 255, 224, 0.5)", "orange") + "までお気軽にご連絡ください。",
        "",
        makeSpan("必読", "rgba(255, 255, 255, 0.5)", "red"),
        "以下の事項に反する行為を行った場合、Tokenが電話認証要求などによって使用できなくなる可能性があります。",
        "・DMの送信は異なるIPアドレスからであっても1日3回以内にとどめる" + makeSpan("(絶対)", "rgba(255, 192, 203, 0.5)", "red"),
        "・リクエストの送信間隔は0.5秒以上にする" + makeSpan("(強く推奨)", "rgba(173, 216, 230, 0.5)", "blue"),
        "・Tokenのアカウントのパスワードを変えたり、二段階認証をしない" + makeSpan("(強く推奨)", "rgba(173, 216, 230, 0.5)", "blue"),
        "・使用中にIPアドレスなど、通信を変更しない" + makeSpan("(強く推奨)", "rgba(173, 216, 230, 0.5)", "blue"),
        "・同じTokenを複数のIPアドレスから操作しない" + makeSpan("(強く推奨)", "rgba(173, 216, 230, 0.5)", "blue"),
        "・操作ボタンを連打しない" + makeSpan("(強く推奨)", "rgba(173, 216, 230, 0.5)", "blue"),
        "・DMの送信の際はそのTokenの共有者と送信回数を共有する" + makeSpan("(推奨)", "rgba(144, 238, 144, 0.5)", "green")
    ]);
    ["説明", "ログ"].forEach(function (k) {
        logArea[k] = document.createElement("div");
        setStyle(logArea[k], {
            padding: "1em",
            backgroundColor: "rgba(0, 0, 0, 0.25)"
        });
    });
    addBreak(h);
    addTab(h, logArea);
    addSummary(logArea["説明"], [
        "開発者ツールが使用できない環境でも簡易的な通信の情報を見るための物です。",
        "通信の情報以外にも不正な入力値の警告などが表示されます。",
        "ログをコピーして詳しい方に見せることで、開発者ツールが使用できない環境の方や通信に詳しくない方でもエラーの原因などを探ることができます。",
        "",
        makeSpan("注意", "Transparent", "red"),
        "ログを他の場所へ貼る場合は「Tokenを隠す」を押してログ内のTokenを隠すことを推奨します。"
    ]);
    addBtn(logArea["ログ"], "クリア", function () {
        logOutput.value = "";
        triggerEvent(logOutput, "updatetext");
    });
    addBtn(logArea["ログ"], "Tokenを隠す", function () {
        logOutput.value = logOutput.value.replace(tokenRegExp, "[[MaskedToken]]");
    });
    addBreak(logArea["ログ"]);
    logOutput = addTextarea(logArea["ログ"], "ログ", true);
})();
