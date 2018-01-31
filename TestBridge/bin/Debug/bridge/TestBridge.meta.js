Bridge.assembly("TestBridge", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,System.Windows.Forms,System.ComponentModel,System.Data];
    $m("TestBridge.Class1", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[0].Void}]}; });
    $m("Test.Form1", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":3,"n":"Dispose","t":8,"pi":[{"n":"disposing","pt":$n[0].Boolean,"ps":0}],"sn":"Dispose","rt":$n[0].Void,"p":[$n[0].Boolean]},{"a":1,"n":"InitializeComponent","t":8,"sn":"InitializeComponent","rt":$n[0].Void},{"a":1,"n":"button10_Click","t":8,"pi":[{"n":"sender","pt":$n[0].Object,"ps":0},{"n":"e","pt":$n[0].Object,"ps":1}],"sn":"button10_Click","rt":$n[0].Void,"p":[$n[0].Object,$n[0].Object]},{"a":1,"n":"button11_Click","t":8,"pi":[{"n":"sender","pt":$n[0].Object,"ps":0},{"n":"e","pt":$n[0].Object,"ps":1}],"sn":"button11_Click","rt":$n[0].Void,"p":[$n[0].Object,$n[0].Object]},{"a":1,"n":"button12_Click","t":8,"pi":[{"n":"sender","pt":$n[0].Object,"ps":0},{"n":"e","pt":$n[0].Object,"ps":1}],"sn":"button12_Click","rt":$n[0].Void,"p":[$n[0].Object,$n[0].Object]},{"a":1,"n":"button13_Click","t":8,"pi":[{"n":"sender","pt":$n[0].Object,"ps":0},{"n":"e","pt":$n[0].Object,"ps":1}],"sn":"button13_Click","rt":$n[0].Void,"p":[$n[0].Object,$n[0].Object]},{"a":1,"n":"button14_Click","t":8,"pi":[{"n":"sender","pt":$n[0].Object,"ps":0},{"n":"e","pt":$n[0].Object,"ps":1}],"sn":"button14_Click","rt":$n[0].Void,"p":[$n[0].Object,$n[0].Object]},{"a":1,"n":"button1_Click","t":8,"pi":[{"n":"sender","pt":$n[0].Object,"ps":0},{"n":"e","pt":$n[0].Object,"ps":1}],"sn":"button1_Click","rt":$n[0].Void,"p":[$n[0].Object,$n[0].Object]},{"a":1,"n":"button7_Click","t":8,"pi":[{"n":"sender","pt":$n[0].Object,"ps":0},{"n":"e","pt":$n[0].Object,"ps":1}],"sn":"button7_Click","rt":$n[0].Void,"p":[$n[0].Object,$n[0].Object]},{"a":1,"n":"button8_Click","t":8,"pi":[{"n":"sender","pt":$n[0].Object,"ps":0},{"n":"e","pt":$n[0].Object,"ps":1}],"sn":"button8_Click","rt":$n[0].Void,"p":[$n[0].Object,$n[0].Object]},{"a":1,"n":"linkLabel1_LinkClicked","t":8,"pi":[{"n":"sender","pt":$n[0].Object,"ps":0},{"n":"e","pt":$n[1].LinkLabelLinkClickedEventArgs,"ps":1}],"sn":"linkLabel1_LinkClicked","rt":$n[0].Void,"p":[$n[0].Object,$n[1].LinkLabelLinkClickedEventArgs]},{"a":1,"n":"Column1","t":4,"rt":$n[1].DataGridViewTextBoxColumn,"sn":"Column1"},{"a":1,"n":"Column2","t":4,"rt":$n[1].DataGridViewTextBoxColumn,"sn":"Column2"},{"a":1,"n":"button1","t":4,"rt":$n[1].Button,"sn":"button1"},{"a":1,"n":"button10","t":4,"rt":$n[1].Button,"sn":"button10"},{"a":1,"n":"button11","t":4,"rt":$n[1].Button,"sn":"button11"},{"a":1,"n":"button12","t":4,"rt":$n[1].Button,"sn":"button12"},{"a":1,"n":"button13","t":4,"rt":$n[1].Button,"sn":"button13"},{"a":1,"n":"button14","t":4,"rt":$n[1].Button,"sn":"button14"},{"a":1,"n":"button2","t":4,"rt":$n[1].Button,"sn":"button2"},{"a":1,"n":"button3","t":4,"rt":$n[1].Button,"sn":"button3"},{"a":1,"n":"button4","t":4,"rt":$n[1].Button,"sn":"button4"},{"a":1,"n":"button5","t":4,"rt":$n[1].Button,"sn":"button5"},{"a":1,"n":"button6","t":4,"rt":$n[1].Button,"sn":"button6"},{"a":1,"n":"button7","t":4,"rt":$n[1].Button,"sn":"button7"},{"a":1,"n":"button8","t":4,"rt":$n[1].Button,"sn":"button8"},{"a":1,"n":"button9","t":4,"rt":$n[1].Button,"sn":"button9"},{"a":1,"n":"checkBox1","t":4,"rt":$n[1].CheckBox,"sn":"checkBox1"},{"a":1,"n":"comboBox1","t":4,"rt":$n[1].ComboBox,"sn":"comboBox1"},{"a":1,"n":"comboBoxResize1","t":4,"rt":$n[0].ComboBoxResize,"sn":"comboBoxResize1"},{"a":1,"n":"components","t":4,"rt":$n[2].IContainer,"sn":"components"},{"a":1,"n":"dataGridView1","t":4,"rt":$n[1].DataGridView,"sn":"dataGridView1"},{"a":1,"n":"dt","t":4,"rt":$n[3].DataTable,"sn":"dt"},{"a":1,"n":"groupBox1","t":4,"rt":$n[1].GroupBox,"sn":"groupBox1"},{"a":1,"n":"label1","t":4,"rt":$n[1].Label,"sn":"label1"},{"a":1,"n":"label2","t":4,"rt":$n[1].Label,"sn":"label2"},{"a":1,"n":"label3","t":4,"rt":$n[1].Label,"sn":"label3"},{"a":1,"n":"linkLabel1","t":4,"rt":$n[1].LinkLabel,"sn":"linkLabel1"},{"a":1,"n":"listBox1","t":4,"rt":$n[1].ListBox,"sn":"listBox1"},{"a":1,"n":"panel1","t":4,"rt":$n[1].Panel,"sn":"panel1"},{"a":1,"n":"progressBar1","t":4,"rt":$n[1].ProgressBar,"sn":"progressBar1"},{"a":1,"n":"textBox1","t":4,"rt":$n[1].TextBox,"sn":"textBox1"},{"a":1,"n":"textBox2","t":4,"rt":$n[1].TextBox,"sn":"textBox2"},{"a":1,"n":"textBox3","t":4,"rt":$n[1].TextBox,"sn":"textBox3"},{"a":1,"n":"textBoxResize1","t":4,"rt":$n[0].TextBoxResize,"sn":"textBoxResize1"}]}; });
});