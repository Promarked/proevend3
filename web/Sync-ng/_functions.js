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
                rp = rp.replace("á", '&aacute;');
                rp = rp.replace("é", '&eacute;');
                rp = rp.replace("í", '&iacute;');
                rp = rp.replace("ó", '&oacute;');
                rp = rp.replace("ú", '&uacute;');
                rp = rp.replace("ñ", '&ntilde;');
                rp = rp.replace("ü", '&uuml;');
                //
                rp = rp.replace("Á", '&Aacute;');
                rp = rp.replace("É", '&Eacute;');
                rp = rp.replace("Í", '&Iacute;');
                rp = rp.replace("Ó", '&Oacute;');
                rp = rp.replace("Ú", '&Uacute;');
                rp = rp.replace("Ñ", '&Ntilde;');
                rp = rp.replace("Ü", '&Uuml;');

                return rp;
            },
            decode:function (text) {
                var rp = String(text);
                //
                rp = rp.replace("&aacute;", 'á');
                rp = rp.replace("&eacute;", 'é');
                rp = rp.replace("&iacute;", 'í');
                rp = rp.replace("&oacute;", 'ó');
                rp = rp.replace("&uacute;", 'ú');
                rp = rp.replace("&ntilde;", 'ñ');
                rp = rp.replace("&uuml;", 'ü');
                //
                rp = rp.replace("&Aacute;", 'Á');
                rp = rp.replace("&Eacute;", 'É');
                rp = rp.replace("&Iacute;", 'Í');
                rp = rp.replace("&Oacute;", 'Ó');
                rp = rp.replace("&Uacute;", 'Ú');
                rp = rp.replace("&Ñtilde;", 'Ñ');
                rp = rp.replace("&Üuml;", 'Ü');
                //
                return rp;
            }
        },
        normalize:function (text) {
            var rp = String(text);
            rp = rp.replace("á", 'a');
            rp = rp.replace("é", 'e');
            rp = rp.replace("í", 'i');
            rp = rp.replace("ó", 'o');
            rp = rp.replace("ú", 'u');
            rp = rp.replace("ü", 'u');
            //
            rp = rp.replace("Á", 'A');
            rp = rp.replace("É", 'E');
            rp = rp.replace("Í", 'I');
            rp = rp.replace("Ó", 'O');
            rp = rp.replace("Ú", 'U');
            rp = rp.replace("Ü", 'U');
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