//
$(function () {
  var scoreMax=0;
    $(".container #cover2048left").animate({"left":"-261px"},3000);
    $(".container #cover2048right").animate({"left":"542px"},3000);

    //-----------------点击开始
    $(".messageGameIn").click(function () {
        if($(this).text()=="play"){
            //初始化
            $(".containerBody .cell").empty();
            //生成随机数

                createRandomNum();
                createRandomNum();

            $(this).parents("#startGame").find(".messageGame").text("Game Over");
            $(this).html("<a href='javascript:void(0)'>Replay</a>");
            $(this).parents("#startGame").hide();
            //score=0
            $(".scoreMax .titlemax").text("0");
        }
        else{
            //初始化
            $(".containerBody .cell").empty();
            //生成随机数
                createRandomNum();
                createRandomNum();

            $(this).parents("#startGame").hide();
            //score=0
            $(".scoreMax .titlemax").text("0");
        }
    });


    //-----------------生成随机数
    function createRandomNum() {
        var randomNum;
        if(Math.random()>0.2){
            randomNum=2
        }
        else {
            randomNum=4
        }
        var divs=[];
        $(".containerBody .cell").each(function (index , elem){
            if(elem.innerText==""){
                divs.push(elem);
            }
        });
        var divRanNum=parseInt(Math.random()*divs.length);
        divs[divRanNum].innerHTML=randomNum;
        addClassAll();
    }


    //------------------添加样式
    function addClassAll(){
        $(".containerBody .cell").each(function (index,elem){
            var num=elem.innerText;
            $(elem).removeClass().addClass("setNum"+num).addClass("cell");
        });
    }


    //-----------------判断是否结束


    function endX() {
        for(var i = 0; i < 4; i++){
            for (var j=0;j<3;j++){
                if($(".containerBody .cell[name="+i+""+j+"]").text()==$(".containerBody .cell[name="+i+""+(j+1)+"]").text()){
                    return false;
                }
            }
        }
        for(var j = 0; j < 4; j++){
            for (var i=0;i<3;i++){
                if($(".containerBody .cell[name="+i+""+j+"]").text()==$(".containerBody .cell[name="+(i+1)+""+j+"]").text()){
                    return false;
                }
            }
        }
        return true;
    }






    //-----------------游戏结束判断，返回时true时，结束
    function endXY() {
        var type = false;
        if(endX()) {
            type=true;
            for(var i=0;i<16;i++){
                if($(".containerBody .cell:eq("+i+")").text()==""){
                    return false;
                };
            }
        }
        return type;
    }



    //upKeyFun 按向上移动函数
    function upKeyFun() {
        var scoreMax=$(".scoreMax .titlemax").text();
        var arrOld=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        var arrNew=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

        for(var j=0;j<4;j++){
            for(var i=0;i<4;i++){
                arrOld[i][j]=$(".containerBody .cell[name="+i+""+j+"]").text();
                arrNew[i][j]=arrOld[i][j];
            }
        }
        // 判断
        var type=[true,true,true,true];
        for(var j=0;j<4;j++){
            if(arrOld[0][j]!=""&&arrOld[0][j]!=arrOld[1][j]){
                if(arrOld[1][j]!=""&&arrOld[1][j]!=arrOld[2][j]){
                    if(arrOld[2][j]!=""&&arrOld[2][j]!=arrOld[3][j]){
                        type[j]=false;
                    }
                    else if(arrOld[2][j]==""&&arrOld[3][j]==""){
                        type[j]=false;
                    }
                }
                else if(arrOld[1][j]==""&&arrOld[2][j]==""&&arrOld[3][j]==""){
                    type[j]=false;
                }
            }
            else if(arrOld[0][j]==""&&arrOld[1][j]==""&&arrOld[2][j]==""&&arrOld[3][j]==""){
                type[j]=false;
            }
        }
        var type1=false;
        for(var j=0;j<4;j++){
            type1=(type[j]||type1)?true:false;
        }
        if(!type1){
            return;
        }
        //捏泡
        for(var j=0;j<4;j++) {
            for (var i = 0; i < 3; i++) {
                for(var k=i+1;k<4;k++){
                    if (arrNew[i][j] == "") {
                            arrNew[i][j]=arrNew[k][j];
                            arrNew[k][j]="";
                    }
                }

            }
        }
        for(var j=0;j<4;j++) {
            //当相等时，相加
            for (var i = 0;i< 3; i++) {
                var h=i+1;
                if(arrNew[i][j]==arrNew[h][j]){
                    arrNew[i][j]*=2;
                    arrNew[h][j]="";
                    scoreMax=scoreMax*1+arrNew[i][j]*1;
                    i++;
                }
            }
            //捏泡
            for (var i = 0; i < 3; i++) {
                for(var k=i+1;k<4;k++){
                    if (arrNew[i][j] == "") {
                        arrNew[i][j]=arrNew[k][j];
                        arrNew[k][j]="";
                    }
                }

            }
        }

        //赋值到div.cell上
        for(var j=0;j<4;j++){
            for(var i=0;i<4;i++){
                if(arrNew[i][j]==0){
                    $(".containerBody .cell[name="+i+""+j+"]").text("");
                }
                else {
                    $(".containerBody .cell[name="+i+""+j+"]").text(arrNew[i][j]);
                }
            }
        }
        $(".scoreMax .titlemax").text(scoreMax);
        createRandomNum();
    }



    //downKeyFun 按向下移动函数
    function downKeyFun() {
        var scoreMax=$(".scoreMax .titlemax").text();
        var arrOld=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        var arrNew=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

        for(var j=0;j<4;j++){
            for(var i=0;i<4;i++){
                arrOld[i][j]=$(".containerBody .cell[name="+i+""+j+"]").text();
                arrNew[i][j]=arrOld[i][j];
            }
        }
        // 判断
        var type=[true,true,true,true];
        for(var j=0;j<4;j++){
            if(arrOld[3][j]!=""&&arrOld[3][j]!=arrOld[2][j]){
                if(arrOld[2][j]!=""&&arrOld[2][j]!=arrOld[1][j]){
                    if(arrOld[1][j]!=""&&arrOld[1][j]!=arrOld[0][j]){
                        type[j]=false;
                    }
                    else if(arrOld[1][j]==""&&arrOld[0][j]==""){
                        type[j]=false;
                    }
                }
                else if(arrOld[2][j]==""&&arrOld[1][j]==""&&arrOld[0][j]==""){
                    type[j]=false;
                }
            }
            else if(arrOld[3][j]==""&&arrOld[2][j]==""&&arrOld[1][j]==""&&arrOld[0][j]==""){
                type[j]=false;
            }
        }
        var type1=false;
        for(var j=0;j<4;j++){
            type1=(type[j]||type1)?true:false;
        }
        if(!type1){
            return;
        }
        //捏泡
        for(var j=0;j<4;j++) {
            for (var i = 3; i > 0; i--) {
                for(var k=i-1;k>-1;k--){
                    if (arrNew[i][j] == "") {
                        arrNew[i][j]=arrNew[k][j];
                        arrNew[k][j]="";
                    }
                }

            }
        }
        for(var j=0;j<4;j++) {
            //当相等时，相加
            for (var i = 3;i> 0; i--) {
                var h=i-1;
                if(arrNew[i][j]==arrNew[h][j]){
                    arrNew[i][j]*=2;
                    arrNew[h][j]="";
                    scoreMax=scoreMax*1+arrNew[i][j]*1;
                    i--;
                }
            }
            //捏泡
            for (var i = 3; i > 0; i--) {
                for(var k=i-1;k>-1;k--){
                    if (arrNew[i][j] == "") {
                        arrNew[i][j]=arrNew[k][j];
                        arrNew[k][j]="";
                    }
                }

            }
        }

        //赋值到div.cell上
        for(var j=0;j<4;j++){
            for(var i=0;i<4;i++){
                if(arrNew[i][j]==""){
                    $(".containerBody .cell[name="+i+""+j+"]").text("");
                }
                else {
                    $(".containerBody .cell[name="+i+""+j+"]").text(arrNew[i][j]);
                }
            }
        }
        $(".scoreMax .titlemax").text(scoreMax);
        createRandomNum();
    }

    //leftKeyFun 按向左移动函数
    function leftKeyFun() {
        var scoreMax=$(".scoreMax .titlemax").text();
        var arrOld=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        var arrNew=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

        for(var j=0;j<4;j++){
            for(var i=0;i<4;i++){
                arrOld[i][j]=$(".containerBody .cell[name="+i+""+j+"]").text();
                arrNew[i][j]=arrOld[i][j];
            }
        }
        // 判断
        var type=[true,true,true,true];
        for(var i=0;i<4;i++){
            if(arrOld[i][0]!=""&&arrOld[i][0]!=arrOld[i][1]){
                if(arrOld[i][1]!=""&&arrOld[i][1]!=arrOld[i][2]){
                    if(arrOld[i][2]!=""&&arrOld[i][2]!=arrOld[i][3]){
                        type[i]=false;
                    }
                    else if(arrOld[i][2]==""&&arrOld[i][3]==""){
                        type[i]=false;
                    }
                }
                else if(arrOld[i][1]==""&&arrOld[i][2]==""&&arrOld[i][3]==""){
                    type[i]=false;
                }
            }
            else if(arrOld[i][0]==""&&arrOld[i][1]==""&&arrOld[i][2]==""&&arrOld[i][3]==""){
                type[i]=false;
            }
        }
        var type1=false;
        for(var j=0;j<4;j++){
            type1=(type[j]||type1)?true:false;
        }
        if(!type1){
            return;
        }
        //捏泡
        for(var i=0;i<4;i++) {
            for (var j = 0; j < 3; j++) {
                for(var k=j+1;k<4;k++){
                    if (arrNew[i][j] == "") {
                        arrNew[i][j]=arrNew[i][k];
                        arrNew[i][k]="";
                    }
                }

            }
        }
        for(var i=0;i<4;i++) {
            //当相等时，相加
            for (var j = 0;j< 3; j++) {
                var h=j+1;
                if(arrNew[i][j]==arrNew[i][h]){
                    arrNew[i][j]*=2;
                    arrNew[i][h]="";
                    scoreMax=scoreMax*1+arrNew[i][j]*1;
                    j++;
                }
            }
            //捏泡
            for (var j = 0; j < 3; j++) {
                for(var k=j+1;k<4;k++){
                    if (arrNew[i][j] == "") {
                        arrNew[i][j]=arrNew[i][k];
                        arrNew[i][k]="";
                    }
                }

            }
        }

        //赋值到div.cell上
        for(var j=0;j<4;j++){
            for(var i=0;i<4;i++){
                if(arrNew[i][j]==0){
                    $(".containerBody .cell[name="+i+""+j+"]").text("");
                }
                else {
                    $(".containerBody .cell[name="+i+""+j+"]").text(arrNew[i][j]);
                }
            }
        }
        $(".scoreMax .titlemax").text(scoreMax);
        createRandomNum();
    }






    //righKeyFun 按向右移动函数
    function rightKeyFun() {
        var scoreMax=$(".scoreMax .titlemax").text();
        var arrOld=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        var arrNew=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

        for(var j=0;j<4;j++){
            for(var i=0;i<4;i++){
                arrOld[i][j]=$(".containerBody .cell[name="+i+""+j+"]").text();
                arrNew[i][j]=arrOld[i][j];
            }
        }
        // 判断
        var type=[true,true,true,true];
        for(var i=0;i<4;i++){
            if(arrOld[i][3]!=""&&arrOld[i][3]!=arrOld[i][2]){
                if(arrOld[i][2]!=""&&arrOld[i][2]!=arrOld[i][1]){
                    if(arrOld[i][1]!=""&&arrOld[i][1]!=arrOld[i][0]){
                        type[i]=false;
                    }
                    else if(arrOld[i][1]==""&&arrOld[i][0]==""){
                        type[i]=false;
                    }
                }
                else if(arrOld[i][2]==""&&arrOld[i][1]==""&&arrOld[i][0]==""){
                    type[i]=false;
                }
            }
            else if(arrOld[i][3]==""&&arrOld[i][2]==""&&arrOld[i][1]==""&&arrOld[i][0]==""){
                type[i]=false;
            }
        }
        var type1=false;
        for(var j=0;j<4;j++){
            type1=(type[j]||type1)?true:false;
        }
        if(!type1){
            return;
        }
        //捏泡
        for(var i=0;i<4;i++) {
            for (var j = 3; j > 0; j--) {
                for(var k=j-1;k>-1;k--){
                    if (arrNew[i][j] == "") {
                        arrNew[i][j]=arrNew[i][k];
                        arrNew[i][k]="";
                    }
                }

            }
        }
        for(var i=0;i<4;i++) {
            //当相等时，相加
            for (var j = 3;j> 0; j--) {
                var h=j-1;
                if(arrNew[i][j]==arrNew[i][h]){
                    arrNew[i][j]*=2;
                    arrNew[i][h]="";
                    scoreMax=scoreMax*1+arrNew[i][j]*1;
                    j--;
                }
            }
            //捏泡
            for (var j = 3; j > 0; j--) {
                for(var k=j-1;k>-1;k--){
                    if (arrNew[i][j] == "") {
                        arrNew[i][j]=arrNew[i][k];
                        arrNew[i][k]="";
                    }
                }

            }
        }

        //赋值到div.cell上
        for(var j=0;j<4;j++){
            for(var i=0;i<4;i++){
                if(arrNew[i][j]==0){
                    $(".containerBody .cell[name="+i+""+j+"]").text("");
                }
                else {
                    $(".containerBody .cell[name="+i+""+j+"]").text(arrNew[i][j]);
                }
            }
        }
        $(".scoreMax .titlemax").text(scoreMax);
        createRandomNum();
    }


    //按键
    $(window).keyup(function (e) {
        ev=e||event;
        switch (e.keyCode){
            //按向上
            case 38:
            case 87:
                //向上移动函数
                upKeyFun();
                break;

            //按向左
            case 37:
            case 65:
                //判断是否能按左
                leftKeyFun();
                break;

            //按向下
            case 40:
            case 83:
                //向下移动函数
                downKeyFun();
                break;

            //按向右
            case 39:
            case 68:
                //判断是否能按右
                rightKeyFun();
                break;
        }
        if(endXY()){$(".container #startGame").show();}
    });








});
