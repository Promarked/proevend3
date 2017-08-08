/**
 * Created by Promarked on 5/08/2017.
 */


var $f={
    defaultValue:function (variable, value) {
       if(variable==undefined){
           variable = value;
       }
       return variable;
    },
    string:{
        chaset: {
            encode: function (text) {
                var rp = text;
                rp = rp.replace("�", '&aacute;');
                rp = rp.replace("�", '&eacute;');
                rp = rp.replace("�", '&iacute;');
                rp = rp.replace("�", '&oacute;');
                rp = rp.replace("�", '&uacute;');
                rp = rp.replace("�", '&ntilde;');
                rp = rp.replace("�", '&uuml;');
                //
                rp = rp.replace("�", '&Aacute;');
                rp = rp.replace("�", '&Eacute;');
                rp = rp.replace("�", '&Iacute;');
                rp = rp.replace("�", '&Oacute;');
                rp = rp.replace("�", '&Uacute;');
                rp = rp.replace("�", '&Ntilde;');
                rp = rp.replace("�", '&Uuml;');

                return rp;
            },
            decode:function (text) {
                var rp = String(text);
                //
                rp = rp.replace("&aacute;", '�');
                rp = rp.replace("&eacute;", '�');
                rp = rp.replace("&iacute;", '�');
                rp = rp.replace("&oacute;", '�');
                rp = rp.replace("&uacute;", '�');
                rp = rp.replace("&ntilde;", '�');
                rp = rp.replace("&uuml;", '�');
                //
                rp = rp.replace("&Aacute;", '�');
                rp = rp.replace("&Eacute;", '�');
                rp = rp.replace("&Iacute;", '�');
                rp = rp.replace("&Oacute;", '�');
                rp = rp.replace("&Uacute;", '�');
                rp = rp.replace("&�tilde;", '�');
                rp = rp.replace("&�uml;", '�');
                //
                return rp;
            }
        },
        normalize:function (text) {
            var rp = String(text);
            rp = rp.replace("�", 'a');
            rp = rp.replace("�", 'e');
            rp = rp.replace("�", 'i');
            rp = rp.replace("�", 'o');
            rp = rp.replace("�", 'u');
            rp = rp.replace("�", 'u');
            //
            rp = rp.replace("�", 'A');
            rp = rp.replace("�", 'E');
            rp = rp.replace("�", 'I');
            rp = rp.replace("�", 'O');
            rp = rp.replace("�", 'U');
            rp = rp.replace("�", 'U');
            return rp ;
        },
        hasIgnoreFormat:function (find, text) {
            find = find.toLowerCase();
            text = text.toLowerCase();
            find = this.normalize(find);
            text = this.normalize(text);
            return new RegExp(find).test(text);
        }
    }
}

$(function () {
    String.prototype.hasIgnoreFormat=function (string) {
        return $f.string.hasIgnoreFormat(this, string);
    }

    String.prototype.cleanAccents=function () {
        return $f.string.normalize(this)
    }
    String.prototype.htmlEncode=function () {
        return $f.string.chaset.encode(this);
    }
});