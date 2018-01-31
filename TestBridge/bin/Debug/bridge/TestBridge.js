/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.7.0
 */
Bridge.assembly("TestBridge", function ($asm, globals) {
    "use strict";

    /** @namespace Test */

    /**
     * https://getmdl.io/started/index.html
     https://getbootstrap.com/docs/4.0/getting-started/introduction/
     *
     * @public
     * @class Test.Form1
     * @augments System.Windows.Forms.Form
     */
    Bridge.define("Test.Form1", {
        inherits: [System.Windows.Forms.Form],
        fields: {
            dt: null,
            /**
             * Required designer variable.
             *
             * @instance
             * @private
             * @memberof Test.Form1
             * @type System.ComponentModel.IContainer
             */
            components: null,
            button1: null,
            panel1: null,
            button2: null,
            button3: null,
            button4: null,
            button5: null,
            textBox1: null,
            checkBox1: null,
            label1: null,
            linkLabel1: null,
            comboBox1: null,
            listBox1: null,
            groupBox1: null,
            textBox2: null,
            label2: null,
            textBoxResize1: null,
            comboBoxResize1: null,
            button6: null,
            dataGridView1: null,
            progressBar1: null,
            button7: null,
            button8: null,
            textBox3: null,
            label3: null,
            button9: null,
            button10: null,
            button11: null,
            button12: null,
            button13: null,
            button14: null,
            Column1: null,
            Column2: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.Form.ctor.call(this);
                this.InitializeComponent();
            }
        },
        methods: {
            button1_Click: function (sender, e) {
                alert("Hello World");
            },
            linkLabel1_LinkClicked: function (sender, e) {

            },
            button8_Click: function (sender, e) {
                var value = { v : 1 };
                if (System.Int32.tryParse((this.textBox3.Text || "") + "", value)) {
                    this.progressBar1.Value = (this.progressBar1.Value + value.v) | 0;
                } else {
                    this.progressBar1.Value = (this.progressBar1.Value + 1) | 0;
                }
            },
            button7_Click: function (sender, e) {
                var value = { v : 1 };
                if (System.Int32.tryParse((this.textBox3.Text || "") + "", value)) {
                    this.progressBar1.Value = (this.progressBar1.Value - value.v) | 0;
                } else {
                    this.progressBar1.Value = (this.progressBar1.Value - 1) | 0;
                }
            },
            button10_Click: function (sender, e) {
                if (this.dt == null) {
                    this.dt = new System.Data.DataTable();

                    this.dt.Columns.Add("Column1");
                    this.dt.Columns.Add("Column2");

                    this.dataGridView1.DataSource = this.dt;
                }

                var row = this.dt.NewRow();

                row.setItem("Column1", "1");
                row.setItem("Column2", "Hello World!");

                this.dt.Rows.Add(row);

                this.dt.AcceptChanges();

            },
            button11_Click: function (sender, e) {
                this.dataGridView1.Tag = "card,table table-dark";
            },
            button12_Click: function (sender, e) {
                this.dataGridView1.Tag = "card,table";
            },
            button13_Click: function (sender, e) {
                this.dataGridView1.Tag = "card,table table-striped";
            },
            button14_Click: function (sender, e) {
                this.dataGridView1.Tag = "card,table table-striped table-dark";
            },
            /**
             * Clean up any resources being used.
             *
             * @instance
             * @protected
             * @override
             * @this Test.Form1
             * @memberof Test.Form1
             * @param   {boolean}    disposing    true if managed resources should be disposed; otherwise, false.
             * @return  {void}
             */
            Dispose: function (disposing) {
                if (disposing && (this.components != null)) {
                    this.components.System$IDisposable$dispose();
                }
                System.Windows.Forms.Form.prototype.Dispose.call(this, disposing);
            },
            /**
             * Required method for Designer support - do not modify
             the contents of this method with the code editor.
             *
             * @instance
             * @private
             * @this Test.Form1
             * @memberof Test.Form1
             * @return  {void}
             */
            InitializeComponent: function () {
                this.button1 = new System.Windows.Forms.Button();
                this.panel1 = new System.Windows.Forms.Panel();
                this.button6 = new System.Windows.Forms.Button();
                this.button2 = new System.Windows.Forms.Button();
                this.button3 = new System.Windows.Forms.Button();
                this.button4 = new System.Windows.Forms.Button();
                this.button5 = new System.Windows.Forms.Button();
                this.textBox1 = new System.Windows.Forms.TextBox();
                this.checkBox1 = new System.Windows.Forms.CheckBox();
                this.label1 = new System.Windows.Forms.Label();
                this.linkLabel1 = new System.Windows.Forms.LinkLabel();
                this.comboBox1 = new System.Windows.Forms.ComboBox();
                this.listBox1 = new System.Windows.Forms.ListBox();
                this.groupBox1 = new System.Windows.Forms.GroupBox();
                this.textBox2 = new System.Windows.Forms.TextBox();
                this.label2 = new System.Windows.Forms.Label();
                this.dataGridView1 = new System.Windows.Forms.DataGridView();
                this.Column1 = new System.Windows.Forms.DataGridViewTextBoxColumn();
                this.Column2 = new System.Windows.Forms.DataGridViewTextBoxColumn();
                this.progressBar1 = new System.Windows.Forms.ProgressBar();
                this.button7 = new System.Windows.Forms.Button();
                this.button8 = new System.Windows.Forms.Button();
                this.textBox3 = new System.Windows.Forms.TextBox();
                this.label3 = new System.Windows.Forms.Label();
                this.button9 = new System.Windows.Forms.Button();
                this.button10 = new System.Windows.Forms.Button();
                this.button11 = new System.Windows.Forms.Button();
                this.button12 = new System.Windows.Forms.Button();
                this.button13 = new System.Windows.Forms.Button();
                this.button14 = new System.Windows.Forms.Button();
                this.comboBoxResize1 = new System.ComboBoxResize();
                this.textBoxResize1 = new System.TextBoxResize();
                this.panel1.SuspendLayout();
                Bridge.cast((this.dataGridView1), System.ComponentModel.ISupportInitialize).System$ComponentModel$ISupportInitialize$BeginInit();
                this.SuspendLayout();
                //
                // button1
                //
                this.button1.Location = new System.Drawing.Point.$ctor1(17, 14);
                this.button1.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button1.Name = "button1";
                this.button1.Size = new System.Drawing.Size.$ctor1(99, 39);
                this.button1.TabIndex = 0;
                this.button1.Tag = "btn btn-primary";
                this.button1.Text = "Primary";
                this.button1.UseVisualStyleBackColor = true;
                this.button1.addClick(Bridge.fn.cacheBind(this, this.button1_Click));
                //
                // panel1
                //
                this.panel1.BackColor = System.Drawing.Color.Gainsboro.$clone();
                this.panel1.Controls.add(this.button6);
                this.panel1.Location = new System.Drawing.Point.$ctor1(13, 63);
                this.panel1.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.panel1.Name = "panel1";
                this.panel1.Size = new System.Drawing.Size.$ctor1(390, 225);
                this.panel1.TabIndex = 1;
                this.panel1.Tag = "card";
                //
                // button6
                //
                this.button6.Location = new System.Drawing.Point.$ctor1(4, 5);
                this.button6.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button6.Name = "button6";
                this.button6.Size = new System.Drawing.Size.$ctor1(136, 39);
                this.button6.TabIndex = 17;
                this.button6.Tag = "btn btn-warning";
                this.button6.Text = "Warning";
                this.button6.UseVisualStyleBackColor = true;
                //
                // button2
                //
                this.button2.Location = new System.Drawing.Point.$ctor1(124, 14);
                this.button2.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button2.Name = "button2";
                this.button2.Size = new System.Drawing.Size.$ctor1(131, 39);
                this.button2.TabIndex = 2;
                this.button2.Tag = "btn btn-secondary";
                this.button2.Text = "Secondary";
                this.button2.UseVisualStyleBackColor = true;
                //
                // button3
                //
                this.button3.Location = new System.Drawing.Point.$ctor1(263, 14);
                this.button3.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button3.Name = "button3";
                this.button3.Size = new System.Drawing.Size.$ctor1(124, 39);
                this.button3.TabIndex = 3;
                this.button3.Tag = "btn btn-success";
                this.button3.Text = "Success";
                this.button3.UseVisualStyleBackColor = true;
                //
                // button4
                //
                this.button4.Enabled = false;
                this.button4.Location = new System.Drawing.Point.$ctor1(395, 14);
                this.button4.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button4.Name = "button4";
                this.button4.Size = new System.Drawing.Size.$ctor1(131, 39);
                this.button4.TabIndex = 4;
                this.button4.Tag = "btn btn-danger";
                this.button4.Text = "Danger";
                this.button4.UseVisualStyleBackColor = true;
                //
                // button5
                //
                this.button5.Location = new System.Drawing.Point.$ctor1(534, 14);
                this.button5.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button5.Name = "button5";
                this.button5.Size = new System.Drawing.Size.$ctor1(136, 39);
                this.button5.TabIndex = 5;
                this.button5.Tag = "btn btn-warning";
                this.button5.Text = "Warning";
                this.button5.UseVisualStyleBackColor = true;
                //
                // textBox1
                //
                this.textBox1.Location = new System.Drawing.Point.$ctor1(95, 515);
                this.textBox1.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.textBox1.Name = "textBox1";
                this.textBox1.Size = new System.Drawing.Size.$ctor1(148, 29);
                this.textBox1.TabIndex = 6;
                this.textBox1.Tag = "form-control";
                //
                // checkBox1
                //
                this.checkBox1.AutoSize = true;
                this.checkBox1.Location = new System.Drawing.Point.$ctor1(95, 554);
                this.checkBox1.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.checkBox1.Name = "checkBox1";
                this.checkBox1.Size = new System.Drawing.Size.$ctor1(102, 25);
                this.checkBox1.TabIndex = 7;
                this.checkBox1.Tag = "form-check,form-check-input,form-check-label";
                this.checkBox1.Text = "checkBox1";
                this.checkBox1.UseVisualStyleBackColor = true;
                //
                // label1
                //
                this.label1.AutoSize = true;
                this.label1.Location = new System.Drawing.Point.$ctor1(259, 479);
                this.label1.Margin = new System.Windows.Forms.Padding.$ctor1(4, 0, 4, 0);
                this.label1.Name = "label1";
                this.label1.Size = new System.Drawing.Size.$ctor1(52, 21);
                this.label1.TabIndex = 8;
                this.label1.Text = "label1";
                //
                // linkLabel1
                //
                this.linkLabel1.AutoSize = true;
                this.linkLabel1.Location = new System.Drawing.Point.$ctor1(259, 518);
                this.linkLabel1.Margin = new System.Windows.Forms.Padding.$ctor1(4, 0, 4, 0);
                this.linkLabel1.Name = "linkLabel1";
                this.linkLabel1.Size = new System.Drawing.Size.$ctor1(81, 21);
                this.linkLabel1.TabIndex = 9;
                this.linkLabel1.TabStop = true;
                this.linkLabel1.Text = "linkLabel1";
                this.linkLabel1.addLinkClicked(Bridge.fn.cacheBind(this, this.linkLabel1_LinkClicked));
                //
                // comboBox1
                //
                this.comboBox1.FormattingEnabled = true;
                this.comboBox1.ItemHeight = 21;
                this.comboBox1.Items.AddRange(System.Array.init(["Item 1", "Item 2", "Item 3"], System.Object));
                this.comboBox1.Location = new System.Drawing.Point.$ctor1(95, 584);
                this.comboBox1.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.comboBox1.Name = "comboBox1";
                this.comboBox1.Size = new System.Drawing.Size.$ctor1(148, 29);
                this.comboBox1.TabIndex = 10;
                this.comboBox1.Tag = "form-control";
                //
                // listBox1
                //
                this.listBox1.FormattingEnabled = true;
                this.listBox1.ItemHeight = 21;
                this.listBox1.Items.AddRange(System.Array.init(["Apple", "Orange", "Mango"], System.Object));
                this.listBox1.Location = new System.Drawing.Point.$ctor1(579, 71);
                this.listBox1.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.listBox1.Name = "listBox1";
                this.listBox1.Size = new System.Drawing.Size.$ctor1(294, 67);
                this.listBox1.TabIndex = 11;
                this.listBox1.Tag = "form-control";
                //
                // groupBox1
                //
                this.groupBox1.Location = new System.Drawing.Point.$ctor1(13, 298);
                this.groupBox1.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.groupBox1.Name = "groupBox1";
                this.groupBox1.Padding = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.groupBox1.Size = new System.Drawing.Size.$ctor1(395, 162);
                this.groupBox1.TabIndex = 12;
                this.groupBox1.TabStop = false;
                this.groupBox1.Tag = "card,card-header,card-body";
                this.groupBox1.Text = "groupBox1";
                //
                // textBox2
                //
                this.textBox2.Location = new System.Drawing.Point.$ctor1(95, 476);
                this.textBox2.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.textBox2.Name = "textBox2";
                this.textBox2.ReadOnly = true;
                this.textBox2.Size = new System.Drawing.Size.$ctor1(148, 29);
                this.textBox2.TabIndex = 13;
                this.textBox2.Tag = "form-control";
                this.textBox2.Text = "this is readonly";
                //
                // label2
                //
                this.label2.AutoSize = true;
                this.label2.Location = new System.Drawing.Point.$ctor1(9, 479);
                this.label2.Margin = new System.Windows.Forms.Padding.$ctor1(4, 0, 4, 0);
                this.label2.Name = "label2";
                this.label2.Size = new System.Drawing.Size.$ctor1(78, 21);
                this.label2.TabIndex = 14;
                this.label2.Text = "Readonly:";
                //
                // dataGridView1
                //
                this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
                this.dataGridView1.Columns.AddRange(System.Array.init([this.Column1, this.Column2], System.Windows.Forms.DataGridViewColumn));
                this.dataGridView1.Location = new System.Drawing.Point.$ctor1(442, 146);
                this.dataGridView1.Name = "dataGridView1";
                this.dataGridView1.Size = new System.Drawing.Size.$ctor1(656, 161);
                this.dataGridView1.TabIndex = 17;
                this.dataGridView1.Tag = "card,table,thead-dark";
                //
                // Column1
                //
                this.Column1.DataPropertyName = "Column1";
                this.Column1.HeaderText = "Column1";
                this.Column1.Name = "Column1";
                //
                // Column2
                //
                this.Column2.DataPropertyName = "Column2";
                this.Column2.HeaderText = "Column2";
                this.Column2.Name = "Column2";
                //
                // progressBar1
                //
                this.progressBar1.Location = new System.Drawing.Point.$ctor1(442, 385);
                this.progressBar1.Name = "progressBar1";
                this.progressBar1.Size = new System.Drawing.Size.$ctor1(521, 53);
                this.progressBar1.TabIndex = 18;
                this.progressBar1.Tag = "progress,progress-bar";
                this.progressBar1.Value = 50;
                //
                // button7
                //
                this.button7.Location = new System.Drawing.Point.$ctor1(442, 446);
                this.button7.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button7.Name = "button7";
                this.button7.Size = new System.Drawing.Size.$ctor1(111, 43);
                this.button7.TabIndex = 19;
                this.button7.Tag = "btn btn-primary";
                this.button7.Text = "Decrease";
                this.button7.UseVisualStyleBackColor = true;
                this.button7.addClick(Bridge.fn.cacheBind(this, this.button7_Click));
                //
                // button8
                //
                this.button8.Location = new System.Drawing.Point.$ctor1(852, 446);
                this.button8.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button8.Name = "button8";
                this.button8.Size = new System.Drawing.Size.$ctor1(111, 43);
                this.button8.TabIndex = 20;
                this.button8.Tag = "btn btn-primary";
                this.button8.Text = "Increase";
                this.button8.UseVisualStyleBackColor = true;
                this.button8.addClick(Bridge.fn.cacheBind(this, this.button8_Click));
                //
                // textBox3
                //
                this.textBox3.Location = new System.Drawing.Point.$ctor1(696, 454);
                this.textBox3.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.textBox3.Name = "textBox3";
                this.textBox3.Size = new System.Drawing.Size.$ctor1(148, 29);
                this.textBox3.TabIndex = 21;
                this.textBox3.Tag = "form-control";
                //
                // label3
                //
                this.label3.AutoSize = true;
                this.label3.Location = new System.Drawing.Point.$ctor1(597, 457);
                this.label3.Margin = new System.Windows.Forms.Padding.$ctor1(4, 0, 4, 0);
                this.label3.Name = "label3";
                this.label3.Size = new System.Drawing.Size.$ctor1(91, 21);
                this.label3.TabIndex = 22;
                this.label3.Text = "Increase By:";
                //
                // button9
                //
                this.button9.Location = new System.Drawing.Point.$ctor1(827, 509);
                this.button9.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button9.Name = "button9";
                this.button9.Size = new System.Drawing.Size.$ctor1(136, 39);
                this.button9.TabIndex = 23;
                this.button9.Tag = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent";
                this.button9.Text = "Ripple";
                this.button9.UseVisualStyleBackColor = true;
                //
                // button10
                //
                this.button10.Location = new System.Drawing.Point.$ctor1(442, 315);
                this.button10.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button10.Name = "button10";
                this.button10.Size = new System.Drawing.Size.$ctor1(111, 43);
                this.button10.TabIndex = 24;
                this.button10.Tag = "btn btn-primary";
                this.button10.Text = "New Row";
                this.button10.UseVisualStyleBackColor = true;
                this.button10.addClick(Bridge.fn.cacheBind(this, this.button10_Click));
                //
                // button11
                //
                this.button11.Location = new System.Drawing.Point.$ctor1(561, 315);
                this.button11.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button11.Name = "button11";
                this.button11.Size = new System.Drawing.Size.$ctor1(111, 43);
                this.button11.TabIndex = 25;
                this.button11.Tag = "btn btn-primary";
                this.button11.Text = "Make Dark";
                this.button11.UseVisualStyleBackColor = true;
                this.button11.addClick(Bridge.fn.cacheBind(this, this.button11_Click));
                //
                // button12
                //
                this.button12.Location = new System.Drawing.Point.$ctor1(680, 315);
                this.button12.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button12.Name = "button12";
                this.button12.Size = new System.Drawing.Size.$ctor1(111, 43);
                this.button12.TabIndex = 26;
                this.button12.Tag = "btn btn-primary";
                this.button12.Text = "Make Default";
                this.button12.UseVisualStyleBackColor = true;
                this.button12.addClick(Bridge.fn.cacheBind(this, this.button12_Click));
                //
                // button13
                //
                this.button13.Location = new System.Drawing.Point.$ctor1(799, 315);
                this.button13.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button13.Name = "button13";
                this.button13.Size = new System.Drawing.Size.$ctor1(137, 43);
                this.button13.TabIndex = 27;
                this.button13.Tag = "btn btn-primary";
                this.button13.Text = "Make Stripped";
                this.button13.UseVisualStyleBackColor = true;
                this.button13.addClick(Bridge.fn.cacheBind(this, this.button13_Click));
                //
                // button14
                //
                this.button14.Location = new System.Drawing.Point.$ctor1(944, 315);
                this.button14.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.button14.Name = "button14";
                this.button14.Size = new System.Drawing.Size.$ctor1(137, 43);
                this.button14.TabIndex = 28;
                this.button14.Tag = "btn btn-primary";
                this.button14.Text = "Dark Stripped";
                this.button14.UseVisualStyleBackColor = true;
                this.button14.addClick(Bridge.fn.cacheBind(this, this.button14_Click));
                //
                // comboBoxResize1
                //
                this.comboBoxResize1.DrawMode = System.Windows.Forms.DrawMode.OwnerDrawVariable;
                this.comboBoxResize1.FormattingEnabled = true;
                this.comboBoxResize1.ItemHeight = 43;
                this.comboBoxResize1.Items.AddRange(System.Array.init(["Not Applicable", "Manufacturer's Warranty", "House Warranty", "Extended Warranty"], System.Object));
                this.comboBoxResize1.Location = new System.Drawing.Point.$ctor1(677, 14);
                this.comboBoxResize1.MinimumSize = new System.Drawing.Size.$ctor1(339, 0);
                this.comboBoxResize1.Name = "comboBoxResize1";
                this.comboBoxResize1.Size = new System.Drawing.Size.$ctor1(339, 49);
                this.comboBoxResize1.TabIndex = 16;
                this.comboBoxResize1.Tag = "form-control";
                //
                // textBoxResize1
                //
                this.textBoxResize1.Location = new System.Drawing.Point.$ctor1(410, 61);
                this.textBoxResize1.Name = "textBoxResize1";
                this.textBoxResize1.Size = new System.Drawing.Size.$ctor1(162, 48);
                this.textBoxResize1.TabIndex = 15;
                this.textBoxResize1.Tag = "form-control";
                //
                // Form1
                //
                this.AutoScaleDimensions = new System.Drawing.SizeF.$ctor1(9.0, 21.0);
                this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
                this.BackColor = System.Drawing.Color.White.$clone();
                this.ClientSize = new System.Drawing.Size.$ctor1(1117, 627);
                this.Controls.add(this.button14);
                this.Controls.add(this.button13);
                this.Controls.add(this.button12);
                this.Controls.add(this.button11);
                this.Controls.add(this.button10);
                this.Controls.add(this.button9);
                this.Controls.add(this.label3);
                this.Controls.add(this.textBox3);
                this.Controls.add(this.button8);
                this.Controls.add(this.button7);
                this.Controls.add(this.progressBar1);
                this.Controls.add(this.dataGridView1);
                this.Controls.add(this.comboBoxResize1);
                this.Controls.add(this.textBoxResize1);
                this.Controls.add(this.label2);
                this.Controls.add(this.textBox2);
                this.Controls.add(this.groupBox1);
                this.Controls.add(this.listBox1);
                this.Controls.add(this.comboBox1);
                this.Controls.add(this.linkLabel1);
                this.Controls.add(this.label1);
                this.Controls.add(this.checkBox1);
                this.Controls.add(this.textBox1);
                this.Controls.add(this.button5);
                this.Controls.add(this.button4);
                this.Controls.add(this.button3);
                this.Controls.add(this.button2);
                this.Controls.add(this.panel1);
                this.Controls.add(this.button1);
                this.Font = new System.Drawing.Font.ctor("Segoe UI", 12.0);
                this.Margin = new System.Windows.Forms.Padding.$ctor1(4, 5, 4, 5);
                this.Name = "Form1";
                this.Text = "Form";
                this.panel1.ResumeLayout(false);
                Bridge.cast((this.dataGridView1), System.ComponentModel.ISupportInitialize).System$ComponentModel$ISupportInitialize$EndInit();
                this.ResumeLayout(false);
                this.PerformLayout();

            }
        }
    });

    Bridge.define("TestBridge.Class1", {
        main: function Main () {
            var x = new Test.Form1();
            x.Show();
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUZXN0QnJpZGdlLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyIuLi9UZXN0L0Zvcm0xLmNzIiwiQ2xhc3MxLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBTzhEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBb0JsREE7Ozs7cUNBR3VCQSxRQUFlQTtnQkFHdENBOzs4Q0FJZ0NBLFFBQWVBOzs7cUNBS3hCQSxRQUFlQTtnQkFFdENBO2dCQUNBQSxJQUFHQSxzQkFBYUEsaUNBQXdCQTtvQkFFcENBLHFEQUFzQkE7O29CQUl0QkE7OztxQ0FJbUJBLFFBQWVBO2dCQUV0Q0E7Z0JBQ0FBLElBQUlBLHNCQUFhQSxpQ0FBd0JBO29CQUVyQ0EscURBQXNCQTs7b0JBSXRCQTs7O3NDQU1vQkEsUUFBZUE7Z0JBRXZDQSxJQUFHQSxXQUFNQTtvQkFFTEEsVUFBS0EsSUFBSUE7O29CQUVUQTtvQkFDQUE7O29CQUVBQSxnQ0FBMkJBOzs7Z0JBRy9CQSxVQUFVQTs7Z0JBRVZBO2dCQUNBQTs7Z0JBRUFBLGlCQUFZQTs7Z0JBRVpBOzs7c0NBSXdCQSxRQUFlQTtnQkFFdkNBOztzQ0FHd0JBLFFBQWVBO2dCQUV2Q0E7O3NDQUd3QkEsUUFBZUE7Z0JBRXZDQTs7c0NBR3dCQSxRQUFlQTtnQkFFdkNBOzs7Ozs7Ozs7Ozs7OytCQWpHNEJBO2dCQUU1QkEsSUFBSUEsYUFBYUEsQ0FBQ0EsbUJBQWNBO29CQUU1QkE7O2dCQUVKQSx1REFBYUE7Ozs7Ozs7Ozs7Ozs7Z0JBV2JBLGVBQWVBLElBQUlBO2dCQUNuQkEsY0FBY0EsSUFBSUE7Z0JBQ2xCQSxlQUFlQSxJQUFJQTtnQkFDbkJBLGVBQWVBLElBQUlBO2dCQUNuQkEsZUFBZUEsSUFBSUE7Z0JBQ25CQSxlQUFlQSxJQUFJQTtnQkFDbkJBLGVBQWVBLElBQUlBO2dCQUNuQkEsZ0JBQWdCQSxJ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QUNsQkEsWUFBWUEsSUFBSUE7Z0JBQ2hCQSxjQUFjQSxJQUFJQTtnQkFDbEJBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBLEFBQUNBLFlBQTBDQSxDQUFDQTtnQkFDNUNBO2dCQUNBQTs7Ozs7Ozs7WUNyY0FBLFFBQVFBLElBQUlBO1lBQ1pBIiwKICAic291cmNlc0NvbnRlbnQiOiBbIiNpZiAhQlJJREdFXHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbDtcclxudXNpbmcgU3lzdGVtLkRhdGE7XHJcbnVzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzLkZvcm1zO1xyXG4jZWxzZVxyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cy5Gb3JtcztcclxudXNpbmcgU3lzdGVtLkRhdGE7XHJcbiNlbmRpZlxyXG5cclxubmFtZXNwYWNlIFRlc3Rcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIGh0dHBzOi8vZ2V0bWRsLmlvL3N0YXJ0ZWQvaW5kZXguaHRtbFxyXG4gICAgLy8vIGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzQuMC9nZXR0aW5nLXN0YXJ0ZWQvaW50cm9kdWN0aW9uL1xyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEZvcm0xIDogRm9ybVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBGb3JtMSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbml0aWFsaXplQ29tcG9uZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgYnV0dG9uMV9DbGljayhvYmplY3Qgc2VuZGVyLCBFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiNpZiBCUklER0UgICAgICAgICBcclxuICAgICAgICAgICAgUmV0eXBlZC5kb20uYWxlcnQoXCJIZWxsbyBXb3JsZFwiKTsgICAgICAgICAgICBcclxuI2VuZGlmXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgbGlua0xhYmVsMV9MaW5rQ2xpY2tlZChvYmplY3Qgc2VuZGVyLCBMaW5rTGFiZWxMaW5rQ2xpY2tlZEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgYnV0dG9uOF9DbGljayhvYmplY3Qgc2VuZGVyLCBFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCB2YWx1ZSA9IDE7XHJcbiAgICAgICAgICAgIGlmKGludC5UcnlQYXJzZSh0ZXh0Qm94My5UZXh0ICsgXCJcIiwgb3V0IHZhbHVlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIxLlZhbHVlICs9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIxLlZhbHVlICs9IDE7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBidXR0b243X0NsaWNrKG9iamVjdCBzZW5kZXIsIEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHZhbHVlID0gMTtcclxuICAgICAgICAgICAgaWYgKGludC5UcnlQYXJzZSh0ZXh0Qm94My5UZXh0ICsgXCJcIiwgb3V0IHZhbHVlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIxLlZhbHVlIC09IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIxLlZhbHVlIC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgRGF0YVRhYmxlIGR0O1xyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgYnV0dG9uMTBfQ2xpY2sob2JqZWN0IHNlbmRlciwgRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihkdCA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkdCA9IG5ldyBEYXRhVGFibGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkdC5Db2x1bW5zLkFkZChcIkNvbHVtbjFcIik7XHJcbiAgICAgICAgICAgICAgICBkdC5Db2x1bW5zLkFkZChcIkNvbHVtbjJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YUdyaWRWaWV3MS5EYXRhU291cmNlID0gZHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciByb3cgPSBkdC5OZXdSb3coKTtcclxuXHJcbiAgICAgICAgICAgIHJvd1tcIkNvbHVtbjFcIl0gPSBcIjFcIjtcclxuICAgICAgICAgICAgcm93W1wiQ29sdW1uMlwiXSA9IFwiSGVsbG8gV29ybGQhXCI7XHJcblxyXG4gICAgICAgICAgICBkdC5Sb3dzLkFkZChyb3cpO1xyXG5cclxuICAgICAgICAgICAgZHQuQWNjZXB0Q2hhbmdlcygpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBidXR0b24xMV9DbGljayhvYmplY3Qgc2VuZGVyLCBFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRhdGFHcmlkVmlldzEuVGFnID0gXCJjYXJkLHRhYmxlIHRhYmxlLWRhcmtcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBidXR0b24xMl9DbGljayhvYmplY3Qgc2VuZGVyLCBFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRhdGFHcmlkVmlldzEuVGFnID0gXCJjYXJkLHRhYmxlXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgYnV0dG9uMTNfQ2xpY2sob2JqZWN0IHNlbmRlciwgRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRhR3JpZFZpZXcxLlRhZyA9IFwiY2FyZCx0YWJsZSB0YWJsZS1zdHJpcGVkXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgYnV0dG9uMTRfQ2xpY2sob2JqZWN0IHNlbmRlciwgRXZlbnRBcmdzIGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRhR3JpZFZpZXcxLlRhZyA9IFwiY2FyZCx0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWRhcmtcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBUZXN0O1xyXG5cclxubmFtZXNwYWNlIFRlc3RCcmlkZ2Vcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENsYXNzMVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gbmV3IEZvcm0xKCk7XHJcbiAgICAgICAgICAgIHguU2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==