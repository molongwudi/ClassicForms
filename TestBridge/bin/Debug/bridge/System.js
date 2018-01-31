/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.7.0
 */
Bridge.assembly("System", function ($asm, globals) {
    "use strict";

    Bridge.define("System.Windows.Forms.Control", {
        fields: {
            _location: null,
            _visible: false,
            _parent: null,
            _size: null,
            _tabStop: false,
            _tabIndex: 0,
            Text: null,
            _backColor: null,
            _enabled: false,
            _readonly: false,
            ForeColor: null,
            _tag: null,
            Controls: null,
            _font: null,
            _autoSize: false,
            _init: false,
            Element: null,
            Margin: null,
            Padding: null
        },
        events: {
            Click: null
        },
        props: {
            Name: {
                get: function () {
                    return this.Element.getAttribute("Name");
                },
                set: function (value) {
                    this.Element.setAttribute("Name", value);
                }
            },
            Location: {
                get: function () {
                    return this._location.$clone();
                },
                set: function (value) {
                    this._location = value.$clone();

                    this.Element.style.left = this._location.X + "px";
                    this.Element.style.top = this._location.Y + "px";

                }
            },
            Visible: {
                get: function () {
                    return this._visible;
                },
                set: function (value) {
                    this._visible = value;
                    this.Element.style.visibility = this._visible ? "inherit" : "hidden";
                }
            },
            Parent: {
                get: function () {
                    return this._parent;
                }
            },
            Size: {
                get: function () {
                    return this._size.$clone();
                },
                set: function (value) {
                    this._size = value.$clone();
                    if (this._autoSize) {
                        this.Element.style.width = "auto";
                        this.Element.style.height = "auto";
                    } else {
                        this.Element.style.width = this._size.Width + "px";
                        this.Element.style.height = this._size.Height + "px";
                    }
                }
            },
            TabStop: {
                get: function () {
                    return this._tabStop;
                },
                set: function (value) {
                    this._tabStop = value;
                    this.TabIndex = this._tabIndex;
                }
            },
            TabIndex: {
                get: function () {
                    return this._tabIndex;
                },
                set: function (value) {
                    this._tabIndex = value;
                    if (this.TabStop) {
                        this.Element.tabIndex = value;
                    } else {
                        this.Element.removeAttribute("TabIndex");
                    }
                }
            },
            BackColor: {
                get: function () {
                    return this._backColor.$clone();
                },
                set: function (value) {
                    this._backColor = value.$clone();
                    this.Element.style.backgroundColor = this._backColor.ToHtml();
                }
            },
            Enabled: {
                get: function () {
                    return this._enabled;
                },
                set: function (value) {
                    this._enabled = value;
                    this.ApplyDisabled();
                }
            },
            ReadOnly: {
                get: function () {
                    return this._readonly;
                },
                set: function (value) {
                    this._readonly = value;
                    this.ApplyReadonly();
                }
            },
            /**
             * Use Tag as Class Name
             *
             * @instance
             * @public
             * @memberof System.Windows.Forms.Control
             * @function Tag
             * @type System.Object
             */
            Tag: {
                get: function () {
                    return this._tag;
                },
                set: function (value) {
                    this._tag = value;
                    if (Bridge.is(this._tag, System.String)) {
                        this.Element.className = (System.String.concat(this._tag, ""));
                    } else {
                        this.Element.className = "";
                    }
                    this.ApplyDisabled();
                }
            },
            Font: {
                get: function () {
                    return this._font;
                },
                set: function (value) {
                    this._font = value;
                    if (this._font == null) {
                        this.Element.style.fontSize = "inherit";
                        this.Element.style.fontFamily = "inherit";
                    } else {
                        this.Element.style.fontSize = (System.Single.format(this._font.EmSize) || "") + "pt";
                        this.Element.style.fontFamily = this._font.FamilyName;
                    }

                }
            },
            AutoSize: {
                get: function () {
                    return this._autoSize;
                },
                set: function (value) {
                    if (this._init) {
                        this._autoSize = value;

                        this.Size = this._size.$clone();
                    }
                }
            }
        },
        ctors: {
            init: function () {
                this._location = new System.Drawing.Point();
                this._size = new System.Drawing.Size();
                this._backColor = new System.Drawing.Color();
                this.ForeColor = new System.Drawing.Color();
                this.Margin = new System.Windows.Forms.Padding();
                this.Padding = new System.Windows.Forms.Padding();
                this._enabled = true;
                this._readonly = false;
            },
            ctor: function (element) {
                this.$initialize();
                this.Element = element;

                this.Controls = new System.Windows.Forms.ControlCollection(this);

                this.Element.style.position = "absolute";
                this.Element.style.boxSizing = "borderbox";


                this.Element.style.fontSize = "inherit";
                this.Element.style.fontFamily = "inherit";

                this.Visible = true;

                this.TabStop = true;

                this.Element.onclick = Bridge.fn.bind(this, function (ev) {
                    ev.stopPropagation();
                    this.OnClick({ });
                    return null;
                });

                this._init = true;
            }
        },
        methods: {
            GetForm: function () {
                if (this.Parent == null) {
                    return null;
                }

                if (Bridge.is(this.Parent, System.Windows.Forms.Form)) {
                    return this.Parent;
                } else {
                    return this.Parent.GetForm();
                }
            },
            ApplyDisabled: function (element) {
                if (element === void 0) { element = null; }
                if (element == null) {
                    element = this.Element;
                }
                if (this.Enabled) {
                    if (element.classList.contains("disabled")) {
                        element.classList.remove("disabled");
                        element.removeAttribute("disabled");
                    }
                } else {
                    if (!element.classList.contains("disabled")) {
                        element.classList.add("disabled");
                        element.setAttribute("disabled", "");
                    }
                }
            },
            Load: function () {
                this.OnLoad();
            },
            OnLoad: function () {

            },
            ApplyReadonly: function (element) {
                if (element === void 0) { element = null; }
                if (element == null) {
                    element = this.Element;
                }
                if (this.ReadOnly) {
                    if (!element.classList.contains("readonly")) {
                        element.classList.add("readonly");
                        element.setAttribute("readonly", "");
                    }
                } else {
                    if (element.classList.contains("readonly")) {
                        element.classList.remove("readonly");
                        element.removeAttribute("readonly");
                    }
                }
            },
            OnClick: function (e) {
                if (!Bridge.staticEquals(this.Click, null)) {
                    this.Click(this, e);
                }
            },
            SuspendLayout: function () {

            },
            ResumeLayout: function (performLayout) {

            },
            PerformLayout: function () {

            }
        }
    });

    Bridge.define("System.ComponentModel.IContainer", {
        inherits: [System.IDisposable],
        $kind: "interface"
    });

    Bridge.define("System.ComponentModel.ISupportInitialize", {
        $kind: "interface"
    });

    Bridge.define("System.Data.DataColumn", {
        fields: {
            Name: null,
            Table: null
        },
        ctors: {
            ctor: function (table, name) {
                this.$initialize();
                this.Name = name;
                this.Table = table;
            }
        }
    });

    Bridge.define("System.Data.DataColumnCollection", {
        fields: {
            Table: null,
            Columns: null
        },
        props: {
            Count: {
                get: function () {
                    return this.Columns.Count;
                }
            }
        },
        ctors: {
            ctor: function (table) {
                this.$initialize();
                this.Table = table;
                this.Columns = new (System.Collections.Generic.List$1(System.Data.DataColumn)).ctor();

            }
        },
        methods: {
            GetColumnIndex: function (name) {
                for (var i = 0; i < this.Columns.Count; i = (i + 1) | 0) {
                    if (Bridge.referenceEquals(this.Columns.getItem(i).Name, name)) {
                        return i;
                    }
                }

                return -1;
            },
            Add: function (columnName) {
                var data = new System.Data.DataColumn(this.Table, columnName);

                this.Columns.add(data);

                return data;

            }
        }
    });

    Bridge.define("System.Data.DataRow", {
        fields: {
            Element: null,
            data: null,
            Columns: null
        },
        ctors: {
            ctor: function (columns) {
                this.$initialize();
                this.Columns = columns;
                this.data = new (System.Collections.Generic.List$1(System.Object)).$ctor2(this.Columns.Count);
                this.Element = document.createElement("tr");
            }
        },
        methods: {
            getItem: function (columnName) {
                return this.getItem$1(this.Columns.GetColumnIndex(columnName));
            },
            setItem: function (columnName, value) {
                this.setItem$1(this.Columns.GetColumnIndex(columnName), value);
            },
            getItem$1: function (columnIndex) {
                if (columnIndex < 0 || columnIndex > ((this.Columns.Count - 1) | 0)) {
                    return null;
                }

                return this.data.getItem(columnIndex);
            },
            setItem$1: function (columnIndex, value) {
                if (columnIndex < 0) {
                    return;
                }
                if (columnIndex > ((this.Columns.Count - 1) | 0)) {
                    return;
                }

                if (columnIndex > ((this.data.Count - 1) | 0)) {
                    for (var i = this.data.Count; i < ((columnIndex + 1) | 0); i = (i + 1) | 0) {
                        var dc = document.createElement("td");

                        if (i === columnIndex) {
                            this.data.add(value);
                            dc.innerText = (System.String.concat(value, ""));

                            this.Element.appendChild(dc);

                            return;
                        } else {
                            this.Element.appendChild(dc);
                            this.data.add(null);
                        }
                    }
                } else {
                    this.Element.children[columnIndex].innerText = (System.String.concat(value, ""));
                    this.data.setItem(columnIndex, value);
                }
            }
        }
    });

    Bridge.define("System.Data.DataRowCollection", {
        fields: {
            Table: null,
            rows: null
        },
        ctors: {
            ctor: function (table) {
                this.$initialize();
                this.Table = table;
                this.rows = new (System.Collections.Generic.List$1(System.Data.DataRow)).ctor();
            }
        },
        methods: {
            Add: function (dr) {
                var $t;
                this.rows.add(dr);
                this.Table.OnNewRow(this.Table, ($t = new System.Windows.Forms.NewRowEventArgs(), $t.Row = dr, $t));
            }
        }
    });

    Bridge.define("System.Data.DataTable", {
        fields: {
            Columns: null,
            Rows: null
        },
        events: {
            NewRowEvent: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Columns = new System.Data.DataColumnCollection(this);
                this.Rows = new System.Data.DataRowCollection(this);
            }
        },
        methods: {
            NewRow: function () {
                var dr = new System.Data.DataRow(this.Columns);

                return dr;
            },
            AcceptChanges: function () {

            },
            OnNewRow: function (sender, args) {
                if (!Bridge.staticEquals(this.NewRowEvent, null)) {
                    this.NewRowEvent(sender, args);
                }
            }
        }
    });

    Bridge.define("System.Drawing.Color", {
        $kind: "struct",
        statics: {
            fields: {
                Empty: null,
                StateKnownColorValid: 0,
                StateARGBValueValid: 0,
                StateValueMask: 0,
                StateNameValid: 0,
                NotDefinedValue: System.Int64(0),
                ARGBAlphaShift: 0,
                ARGBRedShift: 0,
                ARGBGreenShift: 0,
                ARGBBlueShift: 0,
                q: 0
            },
            props: {
                Transparent: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Transparent);
                    }
                },
                AliceBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.AliceBlue);
                    }
                },
                AntiqueWhite: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.AntiqueWhite);
                    }
                },
                Aqua: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Aqua);
                    }
                },
                Aquamarine: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Aquamarine);
                    }
                },
                Azure: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Azure);
                    }
                },
                Beige: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Beige);
                    }
                },
                Bisque: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Bisque);
                    }
                },
                Black: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Black);
                    }
                },
                BlanchedAlmond: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.BlanchedAlmond);
                    }
                },
                Blue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Blue);
                    }
                },
                BlueViolet: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.BlueViolet);
                    }
                },
                Brown: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Brown);
                    }
                },
                BurlyWood: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.BurlyWood);
                    }
                },
                CadetBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.CadetBlue);
                    }
                },
                Chartreuse: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Chartreuse);
                    }
                },
                Chocolate: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Chocolate);
                    }
                },
                Coral: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Coral);
                    }
                },
                CornflowerBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.CornflowerBlue);
                    }
                },
                Cornsilk: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Cornsilk);
                    }
                },
                Crimson: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Crimson);
                    }
                },
                Cyan: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Cyan);
                    }
                },
                DarkBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkBlue);
                    }
                },
                DarkCyan: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkCyan);
                    }
                },
                DarkGoldenrod: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkGoldenrod);
                    }
                },
                DarkGray: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkGray);
                    }
                },
                DarkGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkGreen);
                    }
                },
                DarkKhaki: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkKhaki);
                    }
                },
                DarkMagenta: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkMagenta);
                    }
                },
                DarkOliveGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkOliveGreen);
                    }
                },
                DarkOrange: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkOrange);
                    }
                },
                DarkOrchid: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkOrchid);
                    }
                },
                DarkRed: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkRed);
                    }
                },
                DarkSalmon: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkSalmon);
                    }
                },
                DarkSeaGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkSeaGreen);
                    }
                },
                DarkSlateBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkSlateBlue);
                    }
                },
                DarkSlateGray: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkSlateGray);
                    }
                },
                DarkTurquoise: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkTurquoise);
                    }
                },
                DarkViolet: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DarkViolet);
                    }
                },
                DeepPink: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DeepPink);
                    }
                },
                DeepSkyBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DeepSkyBlue);
                    }
                },
                DimGray: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DimGray);
                    }
                },
                DodgerBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.DodgerBlue);
                    }
                },
                Firebrick: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Firebrick);
                    }
                },
                FloralWhite: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.FloralWhite);
                    }
                },
                ForestGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ForestGreen);
                    }
                },
                Fuchsia: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Fuchsia);
                    }
                },
                Gainsboro: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Gainsboro);
                    }
                },
                GhostWhite: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.GhostWhite);
                    }
                },
                Gold: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Gold);
                    }
                },
                Goldenrod: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Goldenrod);
                    }
                },
                Gray: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Gray);
                    }
                },
                Green: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Green);
                    }
                },
                GreenYellow: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.GreenYellow);
                    }
                },
                Honeydew: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Honeydew);
                    }
                },
                HotPink: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.HotPink);
                    }
                },
                IndianRed: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.IndianRed);
                    }
                },
                Indigo: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Indigo);
                    }
                },
                Ivory: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Ivory);
                    }
                },
                Khaki: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Khaki);
                    }
                },
                Lavender: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Lavender);
                    }
                },
                LavenderBlush: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LavenderBlush);
                    }
                },
                LawnGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LawnGreen);
                    }
                },
                LemonChiffon: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LemonChiffon);
                    }
                },
                LightBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightBlue);
                    }
                },
                LightCoral: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightCoral);
                    }
                },
                LightCyan: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightCyan);
                    }
                },
                LightGoldenrodYellow: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightGoldenrodYellow);
                    }
                },
                LightGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightGreen);
                    }
                },
                LightGray: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightGray);
                    }
                },
                LightPink: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightPink);
                    }
                },
                LightSalmon: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightSalmon);
                    }
                },
                LightSeaGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightSeaGreen);
                    }
                },
                LightSkyBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightSkyBlue);
                    }
                },
                LightSlateGray: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightSlateGray);
                    }
                },
                LightSteelBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightSteelBlue);
                    }
                },
                LightYellow: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LightYellow);
                    }
                },
                Lime: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Lime);
                    }
                },
                LimeGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.LimeGreen);
                    }
                },
                Linen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Linen);
                    }
                },
                Magenta: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Magenta);
                    }
                },
                Maroon: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Maroon);
                    }
                },
                MediumAquamarine: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MediumAquamarine);
                    }
                },
                MediumBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MediumBlue);
                    }
                },
                MediumOrchid: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MediumOrchid);
                    }
                },
                MediumPurple: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MediumPurple);
                    }
                },
                MediumSeaGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MediumSeaGreen);
                    }
                },
                MediumSlateBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MediumSlateBlue);
                    }
                },
                MediumSpringGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MediumSpringGreen);
                    }
                },
                MediumTurquoise: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MediumTurquoise);
                    }
                },
                MediumVioletRed: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MediumVioletRed);
                    }
                },
                MidnightBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MidnightBlue);
                    }
                },
                MintCream: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MintCream);
                    }
                },
                MistyRose: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MistyRose);
                    }
                },
                Moccasin: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Moccasin);
                    }
                },
                NavajoWhite: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.NavajoWhite);
                    }
                },
                Navy: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Navy);
                    }
                },
                OldLace: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.OldLace);
                    }
                },
                Olive: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Olive);
                    }
                },
                OliveDrab: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.OliveDrab);
                    }
                },
                Orange: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Orange);
                    }
                },
                OrangeRed: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.OrangeRed);
                    }
                },
                Orchid: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Orchid);
                    }
                },
                PaleGoldenrod: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.PaleGoldenrod);
                    }
                },
                PaleGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.PaleGreen);
                    }
                },
                PaleTurquoise: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.PaleTurquoise);
                    }
                },
                PaleVioletRed: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.PaleVioletRed);
                    }
                },
                PapayaWhip: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.PapayaWhip);
                    }
                },
                PeachPuff: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.PeachPuff);
                    }
                },
                Peru: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Peru);
                    }
                },
                Pink: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Pink);
                    }
                },
                Plum: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Plum);
                    }
                },
                PowderBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.PowderBlue);
                    }
                },
                Purple: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Purple);
                    }
                },
                Red: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Red);
                    }
                },
                RosyBrown: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.RosyBrown);
                    }
                },
                RoyalBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.RoyalBlue);
                    }
                },
                SaddleBrown: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.SaddleBrown);
                    }
                },
                Salmon: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Salmon);
                    }
                },
                SandyBrown: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.SandyBrown);
                    }
                },
                SeaGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.SeaGreen);
                    }
                },
                SeaShell: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.SeaShell);
                    }
                },
                Sienna: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Sienna);
                    }
                },
                Silver: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Silver);
                    }
                },
                SkyBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.SkyBlue);
                    }
                },
                SlateBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.SlateBlue);
                    }
                },
                SlateGray: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.SlateGray);
                    }
                },
                Snow: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Snow);
                    }
                },
                SpringGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.SpringGreen);
                    }
                },
                SteelBlue: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.SteelBlue);
                    }
                },
                Tan: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Tan);
                    }
                },
                Teal: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Teal);
                    }
                },
                Thistle: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Thistle);
                    }
                },
                Tomato: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Tomato);
                    }
                },
                Turquoise: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Turquoise);
                    }
                },
                Violet: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Violet);
                    }
                },
                Wheat: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Wheat);
                    }
                },
                White: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.White);
                    }
                },
                WhiteSmoke: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.WhiteSmoke);
                    }
                },
                Yellow: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Yellow);
                    }
                },
                YellowGreen: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.YellowGreen);
                    }
                }
            },
            ctors: {
                init: function () {
                    this.Empty = new System.Drawing.Color();
                    this.ARGBAlphaShift = 24;
                    this.ARGBRedShift = 16;
                    this.ARGBGreenShift = 8;
                    this.ARGBBlueShift = 0;
                    this.q = 255.0;
                },
                ctor: function () {
                    System.Drawing.Color.Empty = new System.Drawing.Color.ctor();
                    System.Drawing.Color.StateKnownColorValid = 1;
                    System.Drawing.Color.StateARGBValueValid = 2;
                    System.Drawing.Color.StateValueMask = System.Drawing.Color.StateARGBValueValid;
                    System.Drawing.Color.StateNameValid = 8;
                    System.Drawing.Color.NotDefinedValue = System.Int64(0);
                }
            },
            methods: {
                CheckByte: function (value) {
                    if ((value < 0) || (value > 255)) {
                        throw new System.ArgumentException("InvalidEx2BoundArgument");
                    }
                },
                MakeArgb: function (alpha, red, green, blue) {
                    return System.Int64((alpha << 24) | (red << 16) | (green << 8) | blue);
                },
                FromArgb: function (argb) {
                    return new System.Drawing.Color.$ctor2(System.Int64(argb).and((System.Int64([-1,0]))), System.Drawing.Color.StateARGBValueValid, null, 0);
                },
                FromArgb$3: function (alpha, red, green, blue) {
                    System.Drawing.Color.CheckByte(alpha);
                    System.Drawing.Color.CheckByte(red);
                    System.Drawing.Color.CheckByte(green);
                    System.Drawing.Color.CheckByte(blue);
                    return new System.Drawing.Color.$ctor2(System.Drawing.Color.MakeArgb((alpha & 255), (red & 255), (green & 255), (blue & 255)), System.Drawing.Color.StateARGBValueValid, null, 0);
                },
                FromArgb$1: function (alpha, baseColor) {
                    System.Drawing.Color.CheckByte(alpha);
                    return new System.Drawing.Color.$ctor2(System.Drawing.Color.MakeArgb((alpha & 255), baseColor.R, baseColor.G, baseColor.B), System.Drawing.Color.StateARGBValueValid, null, 0);
                },
                FromArgb$2: function (red, green, blue) {
                    return System.Drawing.Color.FromArgb$3(255, red, green, blue);
                },
                IsEnumValid: function (enumValue, value, minValue, maxValue) {
                    return ((value >= minValue) && (value <= maxValue));
                },
                FromKnownColor: function (color) {
                    return new System.Drawing.Color.$ctor1(color);
                },
                FromHex: function (value) {
                    if (System.String.startsWith(value, "#")) {
                        return System.Drawing.Color.FromHex(value.substr(1));
                    } else {
                        return System.Drawing.Color.FromArgb(parseInt(value));
                    }
                },
                op_Implicit$1: function (color) {
                    return color.ToHtml();
                },
                op_Implicit: function (hexValue) {
                    return System.Drawing.Color.FromHex(hexValue);
                },
                op_Equality: function (left, right) {
                    if (((left.value.ne(right.value)) || (left.state !== right.state)) || (left.knownColor !== right.knownColor)) {
                        return false;
                    }
                    return ((Bridge.referenceEquals(left.name, right.name)) || (((left.name != null) && (right.name != null)) && System.String.equals(left.name, right.name)));
                },
                op_Inequality: function (left, right) {
                    return !(System.Drawing.Color.op_Equality(left.$clone(), right.$clone()));
                },
                getDefaultValue: function () { return new System.Drawing.Color(); }
            }
        },
        fields: {
            name: null,
            value: System.Int64(0),
            knownColor: 0,
            state: 0
        },
        props: {
            R: {
                get: function () {
                    return System.Int64.clipu8((this.Value.shr(16)).and(System.Int64(255)));
                }
            },
            G: {
                get: function () {
                    return System.Int64.clipu8((this.Value.shr(8)).and(System.Int64(255)));
                }
            },
            B: {
                get: function () {
                    return System.Int64.clipu8(this.Value.and(System.Int64(255)));
                }
            },
            A: {
                get: function () {
                    return System.Int64.clipu8((this.Value.shr(24)).and(System.Int64(255)));
                }
            },
            IsKnownColor: {
                get: function () {
                    return ((this.state & System.Drawing.Color.StateKnownColorValid) > 0);
                }
            },
            IsEmpty: {
                get: function () {
                    return (this.state === 0);
                }
            },
            IsNamedColor: {
                get: function () {
                    if ((this.state & System.Drawing.Color.StateNameValid) === 0) {
                        return this.IsKnownColor;
                    }
                    return true;
                }
            },
            IsSystemColor: {
                get: function () {
                    if (!this.IsKnownColor) {
                        return false;
                    }
                    if (this.knownColor > 26) {
                        return (this.knownColor > 167);
                    }
                    return true;
                }
            },
            NameAndARGBValue: {
                get: function () {
                    return System.String.format("{{Name={0}, ARGB=({1}, {2}, {3}, {4})}}", this.Name, Bridge.box(this.A, System.Byte), Bridge.box(this.R, System.Byte), Bridge.box(this.G, System.Byte), Bridge.box(this.B, System.Byte));
                }
            },
            Name: {
                get: function () {
                    if ((this.state & System.Drawing.Color.StateNameValid) !== 0) {
                        return this.name;
                    }
                    if (!this.IsKnownColor) {
                        return System.Convert.toStringInBase(this.value, 16, 11);
                    }
                    var str = System.Drawing.KnownColorTable.KnownColorToName(this.knownColor);
                    if (str != null) {
                        return str;
                    }
                    return this.knownColor.toString();
                }
            },
            Value: {
                get: function () {
                    if ((this.state & System.Drawing.Color.StateValueMask) !== 0) {
                        return this.value;
                    }
                    if (this.IsKnownColor) {
                        return System.Int64(System.Drawing.KnownColorTable.KnownColorToArgb(this.knownColor));
                    }
                    return System.Drawing.Color.NotDefinedValue;
                }
            }
        },
        ctors: {
            $ctor1: function (knownColor) {
                this.$initialize();
                this.value = System.Int64(0);
                this.state = System.Drawing.Color.StateKnownColorValid;
                this.name = null;
                this.knownColor = Bridge.Int.sxs(knownColor & 65535);
            },
            $ctor2: function (value, state, name, knownColor) {
                this.$initialize();
                this.value = value;
                this.state = state;
                this.name = name;
                this.knownColor = Bridge.Int.sxs(knownColor & 65535);
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            componentToHex: function (value) {
                var x = value.toString(16);
                return ((x.length === 1 ? "0" : "") || "") + (x || "");
            },
            ToHtml: function () {
                if (this.IsKnownColor) {
                    return System.Drawing.Color.FromArgb(System.Drawing.KnownColorTable.KnownColorToArgb(this.knownColor)).ToHtml();
                } else {
                    if (this.A !== 255) {
                        return System.String.format("#{0}{1}{2}{3}", this.componentToHex(this.A), this.componentToHex(this.R), this.componentToHex(this.G), this.componentToHex(this.B));
                    } else {
                        return System.String.format("#{0}{1}{2}", this.componentToHex(this.R), this.componentToHex(this.G), this.componentToHex(this.B));
                    }
                }
            },
            GetBrightness: function () {
                var z = this.R / System.Drawing.Color.q;
                var x = this.G / System.Drawing.Color.q;
                var c = this.B / System.Drawing.Color.q;
                var v = z;
                var b = z;
                if (x > v) {
                    v = x;
                }
                if (c > v) {
                    v = c;
                }
                if (x < b) {
                    b = x;
                }
                if (c < b) {
                    b = c;
                }
                return ((v + b) / 2.0);
            },
            GetHue: function () {
                if ((this.R === this.G) && (this.G === this.B)) {
                    return 0.0;
                }
                var z = this.R / System.Drawing.Color.q;
                var x = this.G / System.Drawing.Color.q;
                var c = this.B / System.Drawing.Color.q;
                var v = 0.0;
                var b = z;
                var n = z;
                if (x > b) {
                    b = x;
                }
                if (c > b) {
                    b = c;
                }
                if (x < n) {
                    n = x;
                }
                if (c < n) {
                    n = c;
                }
                var num6 = b - n;
                if (z === b) {
                    v = (x - c) / num6;
                } else if (x === b) {
                    v = 2.0 + ((c - z) / num6);
                } else if (c === b) {
                    v = 4.0 + ((z - x) / num6);
                }
                v *= 60.0;
                if (v < 0.0) {
                    v += 360.0;
                }
                return v;
            },
            GetSaturation: function () {
                var z = this.R / System.Drawing.Color.q;
                var x = this.G / System.Drawing.Color.q;
                var c = this.B / System.Drawing.Color.q;
                var v = 0.0;
                var b = z;
                var n = z;
                if (x > b) {
                    b = x;
                }
                if (c > b) {
                    b = c;
                }
                if (x < n) {
                    n = x;
                }
                if (c < n) {
                    n = c;
                }
                if (b === n) {
                    return v;
                }
                var m = (b + n) / 2.0;
                if (m <= 0.5) {
                    return ((b - n) / (b + n));
                }
                return ((b - n) / ((2.0 - b) - n));
            },
            ToArgb: function () {
                return System.Int64.clip32(this.Value);
            },
            ToKnownColor: function () {
                return this.knownColor;
            },
            toString: function () {
                var builder = new System.Text.StringBuilder("", 32);
                builder.append(Bridge.Reflection.getTypeName(Bridge.getType(this)));
                builder.append(" [");
                if ((this.state & System.Drawing.Color.StateNameValid) !== 0) {
                    builder.append(this.Name);
                } else if ((this.state & System.Drawing.Color.StateKnownColorValid) !== 0) {
                    builder.append(this.Name);
                } else if ((this.state & System.Drawing.Color.StateValueMask) !== 0) {
                    builder.appendFormat("A={0}, R={1}, G={2}, B={3}", Bridge.box(this.A, System.Byte), Bridge.box(this.R, System.Byte), Bridge.box(this.G, System.Byte), Bridge.box(this.B, System.Byte));
                } else {
                    builder.append("Empty");
                }
                builder.append("]");
                return builder.toString();
            },
            equals: function (obj) {
                if (Bridge.is(obj, System.Drawing.Color)) {
                    var color = System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj), System.Drawing.Color));
                    if (((this.value.equals(color.value)) && (this.state === color.state)) && (this.knownColor === color.knownColor)) {
                        return ((Bridge.referenceEquals(this.name, color.name)) || (((this.name != null) && (color.name != null)) && System.String.equals(this.name, this.name)));
                    }
                }
                return false;
            },
            getHashCode: function () {
                return ((Bridge.getHashCode(this.value) ^ Bridge.getHashCode(this.state)) ^ Bridge.getHashCode(this.knownColor));
            },
            $clone: function (to) {
                var s = to || new System.Drawing.Color();
                s.name = this.name;
                s.value = this.value;
                s.knownColor = this.knownColor;
                s.state = this.state;
                return s;
            }
        }
    });

    Bridge.define("System.Drawing.Font", {
        fields: {
            FamilyName: null,
            EmSize: 0
        },
        ctors: {
            $ctor1: function (familyName, emSize, style, unit, gdiCharSet) {
                System.Drawing.Font.ctor.call(this, familyName, emSize);

            },
            ctor: function (familyName, emSize) {
                this.$initialize();
                this.FamilyName = familyName;
                this.EmSize = emSize;
            }
        }
    });

    Bridge.define("System.Drawing.FontStyle", {
        $kind: "enum",
        statics: {
            fields: {
                Regular: 0,
                Bold: 1,
                Italic: 2,
                Underline: 4,
                Strikeout: 8
            }
        }
    });

    Bridge.define("System.Drawing.GraphicsUnit", {
        $kind: "enum",
        statics: {
            fields: {
                World: 0,
                Display: 1,
                Pixel: 2,
                Point: 3,
                Inch: 4,
                Document: 5,
                Millimeter: 6
            }
        }
    });

    Bridge.define("System.Drawing.KnownColor", {
        $kind: "enum",
        statics: {
            fields: {
                ActiveBorder: 1,
                ActiveCaption: 2,
                ActiveCaptionText: 3,
                AliceBlue: 28,
                AntiqueWhite: 29,
                AppWorkspace: 4,
                Aqua: 30,
                Aquamarine: 31,
                Azure: 32,
                Beige: 33,
                Bisque: 34,
                Black: 35,
                BlanchedAlmond: 36,
                Blue: 37,
                BlueViolet: 38,
                Brown: 39,
                BurlyWood: 40,
                ButtonFace: 168,
                ButtonHighlight: 169,
                ButtonShadow: 170,
                CadetBlue: 41,
                Chartreuse: 42,
                Chocolate: 43,
                Control: 5,
                ControlDark: 6,
                ControlDarkDark: 7,
                ControlLight: 8,
                ControlLightLight: 9,
                ControlText: 10,
                Coral: 44,
                CornflowerBlue: 45,
                Cornsilk: 46,
                Crimson: 47,
                Cyan: 48,
                DarkBlue: 49,
                DarkCyan: 50,
                DarkGoldenrod: 51,
                DarkGray: 52,
                DarkGreen: 53,
                DarkKhaki: 54,
                DarkMagenta: 55,
                DarkOliveGreen: 56,
                DarkOrange: 57,
                DarkOrchid: 58,
                DarkRed: 59,
                DarkSalmon: 60,
                DarkSeaGreen: 61,
                DarkSlateBlue: 62,
                DarkSlateGray: 63,
                DarkTurquoise: 64,
                DarkViolet: 65,
                DeepPink: 66,
                DeepSkyBlue: 67,
                Desktop: 11,
                DimGray: 68,
                DodgerBlue: 69,
                Firebrick: 70,
                FloralWhite: 71,
                ForestGreen: 72,
                Fuchsia: 73,
                Gainsboro: 74,
                GhostWhite: 75,
                Gold: 76,
                Goldenrod: 77,
                GradientActiveCaption: 171,
                GradientInactiveCaption: 172,
                Gray: 78,
                GrayText: 12,
                Green: 79,
                GreenYellow: 80,
                Highlight: 13,
                HighlightText: 14,
                Honeydew: 81,
                HotPink: 82,
                HotTrack: 15,
                InactiveBorder: 16,
                InactiveCaption: 17,
                InactiveCaptionText: 18,
                IndianRed: 83,
                Indigo: 84,
                Info: 19,
                InfoText: 20,
                Ivory: 85,
                Khaki: 86,
                Lavender: 87,
                LavenderBlush: 88,
                LawnGreen: 89,
                LemonChiffon: 90,
                LightBlue: 91,
                LightCoral: 92,
                LightCyan: 93,
                LightGoldenrodYellow: 94,
                LightGray: 95,
                LightGreen: 96,
                LightPink: 97,
                LightSalmon: 98,
                LightSeaGreen: 99,
                LightSkyBlue: 100,
                LightSlateGray: 101,
                LightSteelBlue: 102,
                LightYellow: 103,
                Lime: 104,
                LimeGreen: 105,
                Linen: 106,
                Magenta: 107,
                Maroon: 108,
                MediumAquamarine: 109,
                MediumBlue: 110,
                MediumOrchid: 111,
                MediumPurple: 112,
                MediumSeaGreen: 113,
                MediumSlateBlue: 114,
                MediumSpringGreen: 115,
                MediumTurquoise: 116,
                MediumVioletRed: 117,
                Menu: 21,
                MenuBar: 173,
                MenuHighlight: 174,
                MenuText: 22,
                MidnightBlue: 118,
                MintCream: 119,
                MistyRose: 120,
                Moccasin: 121,
                NavajoWhite: 122,
                Navy: 123,
                OldLace: 124,
                Olive: 125,
                OliveDrab: 126,
                Orange: 127,
                OrangeRed: 128,
                Orchid: 129,
                PaleGoldenrod: 130,
                PaleGreen: 131,
                PaleTurquoise: 132,
                PaleVioletRed: 133,
                PapayaWhip: 134,
                PeachPuff: 135,
                Peru: 136,
                Pink: 137,
                Plum: 138,
                PowderBlue: 139,
                Purple: 140,
                Red: 141,
                RosyBrown: 142,
                RoyalBlue: 143,
                SaddleBrown: 144,
                Salmon: 145,
                SandyBrown: 146,
                ScrollBar: 23,
                SeaGreen: 147,
                SeaShell: 148,
                Sienna: 149,
                Silver: 150,
                SkyBlue: 151,
                SlateBlue: 152,
                SlateGray: 153,
                Snow: 154,
                SpringGreen: 155,
                SteelBlue: 156,
                Tan: 157,
                Teal: 158,
                Thistle: 159,
                Tomato: 160,
                Transparent: 27,
                Turquoise: 161,
                Violet: 162,
                Wheat: 163,
                White: 164,
                WhiteSmoke: 165,
                Window: 24,
                WindowFrame: 25,
                WindowText: 26,
                Yellow: 166,
                YellowGreen: 167
            }
        }
    });

    Bridge.define("System.Drawing.KnownColorTable", {
        statics: {
            fields: {
                AlphaShift: 0,
                BlueShift: 0,
                colorNameTable: null,
                colorTable: null,
                GreenShift: 0,
                RedShift: 0,
                Win32BlueShift: 0,
                Win32GreenShift: 0,
                Win32RedShift: 0,
                _SysColors: null
            },
            ctors: {
                init: function () {
                    this.AlphaShift = 24;
                    this.BlueShift = 0;
                    this.GreenShift = 8;
                    this.RedShift = 16;
                    this.Win32BlueShift = 16;
                    this.Win32GreenShift = 8;
                    this.Win32RedShift = 0;
                    this._SysColors = System.Array.init([11842740, 13743257, 0, 11250603, 15790320, 16777215, 10526880, 15790320, 10526880, 6908265, 14935011, 16777215, 0, 0, 15389113, 15918295, 7171437, 16750899, 16777215, 13395456, 16578548, 14405055, 5525059, 14811135, 0, 15790320, 15790320, 16750899, 0, 13158600, 16777215, 6579300, 0], System.Int32);
                }
            },
            methods: {
                GetColorName: function (index) {
                    System.Drawing.KnownColorTable.EnsureColorNameTable();
                    return System.Drawing.KnownColorTable.colorNameTable[System.Array.index(index, System.Drawing.KnownColorTable.colorNameTable)];
                },
                ArgbToKnownColor: function (targetARGB) {
                    System.Drawing.KnownColorTable.EnsureColorTable();
                    for (var i = 0; i < System.Drawing.KnownColorTable.colorTable.length; i = (i + 1) | 0) {
                        var num2 = System.Drawing.KnownColorTable.colorTable[System.Array.index(i, System.Drawing.KnownColorTable.colorTable)];
                        if (num2 === targetARGB) {
                            var color = System.Drawing.Color.FromKnownColor(i);
                            if (!color.IsSystemColor) {
                                return color.$clone();
                            }
                        }
                    }
                    return System.Drawing.Color.FromArgb(targetARGB);
                },
                Encode: function (alpha, red, green, blue) {
                    return ((((red << 16) | (green << 8)) | blue) | (alpha << 24));
                },
                EnsureColorNameTable: function () {
                    if (System.Drawing.KnownColorTable.colorNameTable == null) {
                        System.Drawing.KnownColorTable.InitColorNameTable();
                    }
                },
                EnsureColorTable: function () {
                    if (System.Drawing.KnownColorTable.colorTable == null) {
                        System.Drawing.KnownColorTable.InitColorTable();
                    }
                },
                FromWin32Value: function (value) {
                    return System.Drawing.KnownColorTable.Encode(255, value & 255, (value >> 8) & 255, (value >> 16) & 255);
                },
                InitColorNameTable: function () {
                    var s = System.Array.init(175, null, System.String);
                    s[System.Array.index(1, s)] = "ActiveBorder";
                    s[System.Array.index(2, s)] = "ActiveCaption";
                    s[System.Array.index(3, s)] = "ActiveCaptionText";
                    s[System.Array.index(4, s)] = "AppWorkspace";
                    s[System.Array.index(168, s)] = "ButtonFace";
                    s[System.Array.index(169, s)] = "ButtonHighlight";
                    s[System.Array.index(170, s)] = "ButtonShadow";
                    s[System.Array.index(5, s)] = "Control";
                    s[System.Array.index(6, s)] = "ControlDark";
                    s[System.Array.index(7, s)] = "ControlDarkDark";
                    s[System.Array.index(8, s)] = "ControlLight";
                    s[System.Array.index(9, s)] = "ControlLightLight";
                    s[System.Array.index(10, s)] = "ControlText";
                    s[System.Array.index(11, s)] = "Desktop";
                    s[System.Array.index(171, s)] = "GradientActiveCaption";
                    s[System.Array.index(172, s)] = "GradientInactiveCaption";
                    s[System.Array.index(12, s)] = "GrayText";
                    s[System.Array.index(13, s)] = "Highlight";
                    s[System.Array.index(14, s)] = "HighlightText";
                    s[System.Array.index(15, s)] = "HotTrack";
                    s[System.Array.index(16, s)] = "InactiveBorder";
                    s[System.Array.index(17, s)] = "InactiveCaption";
                    s[System.Array.index(18, s)] = "InactiveCaptionText";
                    s[System.Array.index(19, s)] = "Info";
                    s[System.Array.index(20, s)] = "InfoText";
                    s[System.Array.index(21, s)] = "Menu";
                    s[System.Array.index(173, s)] = "MenuBar";
                    s[System.Array.index(174, s)] = "MenuHighlight";
                    s[System.Array.index(22, s)] = "MenuText";
                    s[System.Array.index(23, s)] = "ScrollBar";
                    s[System.Array.index(24, s)] = "Window";
                    s[System.Array.index(25, s)] = "WindowFrame";
                    s[System.Array.index(26, s)] = "WindowText";
                    s[System.Array.index(27, s)] = "Transparent";
                    s[System.Array.index(28, s)] = "AliceBlue";
                    s[System.Array.index(29, s)] = "AntiqueWhite";
                    s[System.Array.index(30, s)] = "Aqua";
                    s[System.Array.index(31, s)] = "Aquamarine";
                    s[System.Array.index(32, s)] = "Azure";
                    s[System.Array.index(33, s)] = "Beige";
                    s[System.Array.index(34, s)] = "Bisque";
                    s[System.Array.index(35, s)] = "Black";
                    s[System.Array.index(36, s)] = "BlanchedAlmond";
                    s[System.Array.index(37, s)] = "Blue";
                    s[System.Array.index(38, s)] = "BlueViolet";
                    s[System.Array.index(39, s)] = "Brown";
                    s[System.Array.index(40, s)] = "BurlyWood";
                    s[System.Array.index(41, s)] = "CadetBlue";
                    s[System.Array.index(42, s)] = "Chartreuse";
                    s[System.Array.index(43, s)] = "Chocolate";
                    s[System.Array.index(44, s)] = "Coral";
                    s[System.Array.index(45, s)] = "CornflowerBlue";
                    s[System.Array.index(46, s)] = "Cornsilk";
                    s[System.Array.index(47, s)] = "Crimson";
                    s[System.Array.index(48, s)] = "Cyan";
                    s[System.Array.index(49, s)] = "DarkBlue";
                    s[System.Array.index(50, s)] = "DarkCyan";
                    s[System.Array.index(51, s)] = "DarkGoldenrod";
                    s[System.Array.index(52, s)] = "DarkGray";
                    s[System.Array.index(53, s)] = "DarkGreen";
                    s[System.Array.index(54, s)] = "DarkKhaki";
                    s[System.Array.index(55, s)] = "DarkMagenta";
                    s[System.Array.index(56, s)] = "DarkOliveGreen";
                    s[System.Array.index(57, s)] = "DarkOrange";
                    s[System.Array.index(58, s)] = "DarkOrchid";
                    s[System.Array.index(59, s)] = "DarkRed";
                    s[System.Array.index(60, s)] = "DarkSalmon";
                    s[System.Array.index(61, s)] = "DarkSeaGreen";
                    s[System.Array.index(62, s)] = "DarkSlateBlue";
                    s[System.Array.index(63, s)] = "DarkSlateGray";
                    s[System.Array.index(64, s)] = "DarkTurquoise";
                    s[System.Array.index(65, s)] = "DarkViolet";
                    s[System.Array.index(66, s)] = "DeepPink";
                    s[System.Array.index(67, s)] = "DeepSkyBlue";
                    s[System.Array.index(68, s)] = "DimGray";
                    s[System.Array.index(69, s)] = "DodgerBlue";
                    s[System.Array.index(70, s)] = "Firebrick";
                    s[System.Array.index(71, s)] = "FloralWhite";
                    s[System.Array.index(72, s)] = "ForestGreen";
                    s[System.Array.index(73, s)] = "Fuchsia";
                    s[System.Array.index(74, s)] = "Gainsboro";
                    s[System.Array.index(75, s)] = "GhostWhite";
                    s[System.Array.index(76, s)] = "Gold";
                    s[System.Array.index(77, s)] = "Goldenrod";
                    s[System.Array.index(78, s)] = "Gray";
                    s[System.Array.index(79, s)] = "Green";
                    s[System.Array.index(80, s)] = "GreenYellow";
                    s[System.Array.index(81, s)] = "Honeydew";
                    s[System.Array.index(82, s)] = "HotPink";
                    s[System.Array.index(83, s)] = "IndianRed";
                    s[System.Array.index(84, s)] = "Indigo";
                    s[System.Array.index(85, s)] = "Ivory";
                    s[System.Array.index(86, s)] = "Khaki";
                    s[System.Array.index(87, s)] = "Lavender";
                    s[System.Array.index(88, s)] = "LavenderBlush";
                    s[System.Array.index(89, s)] = "LawnGreen";
                    s[System.Array.index(90, s)] = "LemonChiffon";
                    s[System.Array.index(91, s)] = "LightBlue";
                    s[System.Array.index(92, s)] = "LightCoral";
                    s[System.Array.index(93, s)] = "LightCyan";
                    s[System.Array.index(94, s)] = "LightGoldenrodYellow";
                    s[System.Array.index(95, s)] = "LightGray";
                    s[System.Array.index(96, s)] = "LightGreen";
                    s[System.Array.index(97, s)] = "LightPink";
                    s[System.Array.index(98, s)] = "LightSalmon";
                    s[System.Array.index(99, s)] = "LightSeaGreen";
                    s[System.Array.index(100, s)] = "LightSkyBlue";
                    s[System.Array.index(101, s)] = "LightSlateGray";
                    s[System.Array.index(102, s)] = "LightSteelBlue";
                    s[System.Array.index(103, s)] = "LightYellow";
                    s[System.Array.index(104, s)] = "Lime";
                    s[System.Array.index(105, s)] = "LimeGreen";
                    s[System.Array.index(106, s)] = "Linen";
                    s[System.Array.index(107, s)] = "Magenta";
                    s[System.Array.index(108, s)] = "Maroon";
                    s[System.Array.index(109, s)] = "MediumAquamarine";
                    s[System.Array.index(110, s)] = "MediumBlue";
                    s[System.Array.index(111, s)] = "MediumOrchid";
                    s[System.Array.index(112, s)] = "MediumPurple";
                    s[System.Array.index(113, s)] = "MediumSeaGreen";
                    s[System.Array.index(114, s)] = "MediumSlateBlue";
                    s[System.Array.index(115, s)] = "MediumSpringGreen";
                    s[System.Array.index(116, s)] = "MediumTurquoise";
                    s[System.Array.index(117, s)] = "MediumVioletRed";
                    s[System.Array.index(118, s)] = "MidnightBlue";
                    s[System.Array.index(119, s)] = "MintCream";
                    s[System.Array.index(120, s)] = "MistyRose";
                    s[System.Array.index(121, s)] = "Moccasin";
                    s[System.Array.index(122, s)] = "NavajoWhite";
                    s[System.Array.index(123, s)] = "Navy";
                    s[System.Array.index(124, s)] = "OldLace";
                    s[System.Array.index(125, s)] = "Olive";
                    s[System.Array.index(126, s)] = "OliveDrab";
                    s[System.Array.index(127, s)] = "Orange";
                    s[System.Array.index(128, s)] = "OrangeRed";
                    s[System.Array.index(129, s)] = "Orchid";
                    s[System.Array.index(130, s)] = "PaleGoldenrod";
                    s[System.Array.index(131, s)] = "PaleGreen";
                    s[System.Array.index(132, s)] = "PaleTurquoise";
                    s[System.Array.index(133, s)] = "PaleVioletRed";
                    s[System.Array.index(134, s)] = "PapayaWhip";
                    s[System.Array.index(135, s)] = "PeachPuff";
                    s[System.Array.index(136, s)] = "Peru";
                    s[System.Array.index(137, s)] = "Pink";
                    s[System.Array.index(138, s)] = "Plum";
                    s[System.Array.index(139, s)] = "PowderBlue";
                    s[System.Array.index(140, s)] = "Purple";
                    s[System.Array.index(141, s)] = "Red";
                    s[System.Array.index(142, s)] = "RosyBrown";
                    s[System.Array.index(143, s)] = "RoyalBlue";
                    s[System.Array.index(144, s)] = "SaddleBrown";
                    s[System.Array.index(145, s)] = "Salmon";
                    s[System.Array.index(146, s)] = "SandyBrown";
                    s[System.Array.index(147, s)] = "SeaGreen";
                    s[System.Array.index(148, s)] = "SeaShell";
                    s[System.Array.index(149, s)] = "Sienna";
                    s[System.Array.index(150, s)] = "Silver";
                    s[System.Array.index(151, s)] = "SkyBlue";
                    s[System.Array.index(152, s)] = "SlateBlue";
                    s[System.Array.index(153, s)] = "SlateGray";
                    s[System.Array.index(154, s)] = "Snow";
                    s[System.Array.index(155, s)] = "SpringGreen";
                    s[System.Array.index(156, s)] = "SteelBlue";
                    s[System.Array.index(157, s)] = "Tan";
                    s[System.Array.index(158, s)] = "Teal";
                    s[System.Array.index(159, s)] = "Thistle";
                    s[System.Array.index(160, s)] = "Tomato";
                    s[System.Array.index(161, s)] = "Turquoise";
                    s[System.Array.index(162, s)] = "Violet";
                    s[System.Array.index(163, s)] = "Wheat";
                    s[System.Array.index(164, s)] = "White";
                    s[System.Array.index(165, s)] = "WhiteSmoke";
                    s[System.Array.index(166, s)] = "Yellow";
                    s[System.Array.index(167, s)] = "YellowGreen";
                    System.Drawing.KnownColorTable.colorNameTable = s;
                },
                UpdateSystemColors: function () {
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(1, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(10);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(2, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(2);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(3, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(9);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(4, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(12);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(168, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(15);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(169, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(20);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(170, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(16);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(5, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(15);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(6, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(16);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(7, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(21);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(8, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(22);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(9, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(20);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(10, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(18);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(11, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(1);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(171, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(27);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(172, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(28);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(12, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(17);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(13, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(13);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(14, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(14);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(15, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(26);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(16, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(11);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(17, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(3);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(18, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(19);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(19, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(24);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(20, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(23);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(21, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(4);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(173, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(30);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(174, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(29);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(22, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(7);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(23, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(0);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(24, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(5);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(25, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(6);
                    System.Drawing.KnownColorTable.colorTable[System.Array.index(26, System.Drawing.KnownColorTable.colorTable)] = System.Drawing.KnownColorTable.SystemColorToArgb(8);
                },
                InitColorTable: function () {
                    var c = System.Array.init(175, 0, System.Int32);

                    c[System.Array.index(27, c)] = 16777215;
                    c[System.Array.index(28, c)] = -984833;
                    c[System.Array.index(29, c)] = -332841;
                    c[System.Array.index(30, c)] = -16711681;
                    c[System.Array.index(31, c)] = -8388652;
                    c[System.Array.index(32, c)] = -983041;
                    c[System.Array.index(33, c)] = -657956;
                    c[System.Array.index(34, c)] = -6972;
                    c[System.Array.index(35, c)] = -16777216;
                    c[System.Array.index(36, c)] = -5171;
                    c[System.Array.index(37, c)] = -16776961;
                    c[System.Array.index(38, c)] = -7722014;
                    c[System.Array.index(39, c)] = -5952982;
                    c[System.Array.index(40, c)] = -2180985;
                    c[System.Array.index(41, c)] = -10510688;
                    c[System.Array.index(42, c)] = -8388864;
                    c[System.Array.index(43, c)] = -2987746;
                    c[System.Array.index(44, c)] = -32944;
                    c[System.Array.index(45, c)] = -10185235;
                    c[System.Array.index(46, c)] = -1828;
                    c[System.Array.index(47, c)] = -2354116;
                    c[System.Array.index(48, c)] = -16711681;
                    c[System.Array.index(49, c)] = -16777077;
                    c[System.Array.index(50, c)] = -16741493;
                    c[System.Array.index(51, c)] = -4684277;
                    c[System.Array.index(52, c)] = -5658199;
                    c[System.Array.index(53, c)] = -16751616;
                    c[System.Array.index(54, c)] = -4343957;
                    c[System.Array.index(55, c)] = -7667573;
                    c[System.Array.index(56, c)] = -11179217;
                    c[System.Array.index(57, c)] = -29696;
                    c[System.Array.index(58, c)] = -6737204;
                    c[System.Array.index(59, c)] = -7667712;
                    c[System.Array.index(60, c)] = -1468806;
                    c[System.Array.index(61, c)] = -7357301;
                    c[System.Array.index(62, c)] = -12042869;
                    c[System.Array.index(63, c)] = -13676721;
                    c[System.Array.index(64, c)] = -16724271;
                    c[System.Array.index(65, c)] = -7077677;
                    c[System.Array.index(66, c)] = -60269;
                    c[System.Array.index(67, c)] = -16728065;
                    c[System.Array.index(68, c)] = -9868951;
                    c[System.Array.index(69, c)] = -14774017;
                    c[System.Array.index(70, c)] = -5103070;
                    c[System.Array.index(71, c)] = -1296;
                    c[System.Array.index(72, c)] = -14513374;
                    c[System.Array.index(73, c)] = -65281;
                    c[System.Array.index(74, c)] = -2302756;
                    c[System.Array.index(75, c)] = -460545;
                    c[System.Array.index(76, c)] = -10496;
                    c[System.Array.index(77, c)] = -2448096;
                    c[System.Array.index(78, c)] = -8355712;
                    c[System.Array.index(79, c)] = -16744448;
                    c[System.Array.index(80, c)] = -5374161;
                    c[System.Array.index(81, c)] = -983056;
                    c[System.Array.index(82, c)] = -38476;
                    c[System.Array.index(83, c)] = -3318692;
                    c[System.Array.index(84, c)] = -11861886;
                    c[System.Array.index(85, c)] = -16;
                    c[System.Array.index(86, c)] = -989556;
                    c[System.Array.index(87, c)] = -1644806;
                    c[System.Array.index(88, c)] = -3851;
                    c[System.Array.index(89, c)] = -8586240;
                    c[System.Array.index(90, c)] = -1331;
                    c[System.Array.index(91, c)] = -5383962;
                    c[System.Array.index(92, c)] = -1015680;
                    c[System.Array.index(93, c)] = -2031617;
                    c[System.Array.index(94, c)] = -329006;
                    c[System.Array.index(95, c)] = -2894893;
                    c[System.Array.index(96, c)] = -7278960;
                    c[System.Array.index(97, c)] = -18751;
                    c[System.Array.index(98, c)] = -24454;
                    c[System.Array.index(99, c)] = -14634326;
                    c[System.Array.index(100, c)] = -7876870;
                    c[System.Array.index(101, c)] = -8943463;
                    c[System.Array.index(102, c)] = -5192482;
                    c[System.Array.index(103, c)] = -32;
                    c[System.Array.index(104, c)] = -16711936;
                    c[System.Array.index(105, c)] = -13447886;
                    c[System.Array.index(106, c)] = -331546;
                    c[System.Array.index(107, c)] = -65281;
                    c[System.Array.index(108, c)] = -8388608;
                    c[System.Array.index(109, c)] = -10039894;
                    c[System.Array.index(110, c)] = -16777011;
                    c[System.Array.index(111, c)] = -4565549;
                    c[System.Array.index(112, c)] = -7114533;
                    c[System.Array.index(113, c)] = -12799119;
                    c[System.Array.index(114, c)] = -8689426;
                    c[System.Array.index(115, c)] = -16713062;
                    c[System.Array.index(116, c)] = -12004916;
                    c[System.Array.index(117, c)] = -3730043;
                    c[System.Array.index(118, c)] = -15132304;
                    c[System.Array.index(119, c)] = -655366;
                    c[System.Array.index(120, c)] = -6943;
                    c[System.Array.index(121, c)] = -6987;
                    c[System.Array.index(122, c)] = -8531;
                    c[System.Array.index(123, c)] = -16777088;
                    c[System.Array.index(124, c)] = -133658;
                    c[System.Array.index(125, c)] = -8355840;
                    c[System.Array.index(126, c)] = -9728477;
                    c[System.Array.index(127, c)] = -23296;
                    c[System.Array.index(128, c)] = -47872;
                    c[System.Array.index(129, c)] = -2461482;
                    c[System.Array.index(130, c)] = -1120086;
                    c[System.Array.index(131, c)] = -6751336;
                    c[System.Array.index(132, c)] = -5247250;
                    c[System.Array.index(133, c)] = -2396013;
                    c[System.Array.index(134, c)] = -4139;
                    c[System.Array.index(135, c)] = -9543;
                    c[System.Array.index(136, c)] = -3308225;
                    c[System.Array.index(137, c)] = -16181;
                    c[System.Array.index(138, c)] = -2252579;
                    c[System.Array.index(139, c)] = -5185306;
                    c[System.Array.index(140, c)] = -8388480;
                    c[System.Array.index(141, c)] = -65536;
                    c[System.Array.index(142, c)] = -4419697;
                    c[System.Array.index(143, c)] = -12490271;
                    c[System.Array.index(144, c)] = -7650029;
                    c[System.Array.index(145, c)] = -360334;
                    c[System.Array.index(146, c)] = -744352;
                    c[System.Array.index(147, c)] = -13726889;
                    c[System.Array.index(148, c)] = -2578;
                    c[System.Array.index(149, c)] = -6270419;
                    c[System.Array.index(150, c)] = -4144960;
                    c[System.Array.index(151, c)] = -7876885;
                    c[System.Array.index(152, c)] = -9807155;
                    c[System.Array.index(153, c)] = -9404272;
                    c[System.Array.index(154, c)] = -1286;
                    c[System.Array.index(155, c)] = -16711809;
                    c[System.Array.index(156, c)] = -12156236;
                    c[System.Array.index(157, c)] = -2968436;
                    c[System.Array.index(158, c)] = -16744320;
                    c[System.Array.index(159, c)] = -2572328;
                    c[System.Array.index(160, c)] = -40121;
                    c[System.Array.index(161, c)] = -12525360;
                    c[System.Array.index(162, c)] = -1146130;
                    c[System.Array.index(163, c)] = -663885;
                    c[System.Array.index(164, c)] = -1;
                    c[System.Array.index(165, c)] = -657931;
                    c[System.Array.index(166, c)] = -256;
                    c[System.Array.index(167, c)] = -6632142;
                    System.Drawing.KnownColorTable.colorTable = c;

                    System.Drawing.KnownColorTable.UpdateSystemColors();
                },
                KnownColorToArgb: function (color) {
                    System.Drawing.KnownColorTable.EnsureColorTable();
                    if (color <= System.Drawing.KnownColor.MenuHighlight) {
                        return System.Drawing.KnownColorTable.colorTable[System.Array.index(color, System.Drawing.KnownColorTable.colorTable)];
                    }
                    return 0;
                },
                KnownColorToName: function (color) {
                    System.Drawing.KnownColorTable.EnsureColorNameTable();
                    if (color <= System.Drawing.KnownColor.MenuHighlight) {
                        return System.Drawing.KnownColorTable.colorNameTable[System.Array.index(color, System.Drawing.KnownColorTable.colorNameTable)];
                    }
                    return null;
                },
                SystemColorToArgb: function (index) {
                    return System.Drawing.KnownColorTable.FromWin32Value(System.Drawing.KnownColorTable._SysColors[System.Array.index(index, System.Drawing.KnownColorTable._SysColors)]);
                }
            }
        }
    });

    Bridge.define("System.Drawing.Point", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new System.Drawing.Point(); }
            }
        },
        fields: {
            X: 0,
            Y: 0
        },
        ctors: {
            $ctor1: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1852403652, this.X, this.Y]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, System.Drawing.Point)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y);
            },
            $clone: function (to) {
                var s = to || new System.Drawing.Point();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("System.Drawing.Size", {
        $kind: "struct",
        statics: {
            fields: {
                Empty: null
            },
            ctors: {
                init: function () {
                    this.Empty = new System.Drawing.Size();
                    this.Empty = new System.Drawing.Size.$ctor1(0, 0);
                }
            },
            methods: {
                getDefaultValue: function () { return new System.Drawing.Size(); }
            }
        },
        fields: {
            Width: 0,
            Height: 0
        },
        ctors: {
            $ctor1: function (width, height) {
                this.$initialize();
                this.Width = width;
                this.Height = height;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1702521171, this.Width, this.Height]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, System.Drawing.Size)) {
                    return false;
                }
                return Bridge.equals(this.Width, o.Width) && Bridge.equals(this.Height, o.Height);
            },
            $clone: function (to) {
                var s = to || new System.Drawing.Size();
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
            }
        }
    });

    Bridge.define("System.Drawing.SizeF", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new System.Drawing.SizeF(); }
            }
        },
        fields: {
            Width: 0,
            Height: 0
        },
        ctors: {
            $ctor1: function (width, height) {
                this.$initialize();
                this.Width = width;
                this.Height = height;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1702521241, this.Width, this.Height]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, System.Drawing.SizeF)) {
                    return false;
                }
                return Bridge.equals(this.Width, o.Width) && Bridge.equals(this.Height, o.Height);
            },
            $clone: function (to) {
                var s = to || new System.Drawing.SizeF();
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
            }
        }
    });

    Bridge.define("System.Drawing.SystemColors", {
        statics: {
            props: {
                ActiveBorder: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ActiveBorder);
                    }
                },
                ActiveCaption: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ActiveCaption);
                    }
                },
                ActiveCaptionText: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ActiveCaptionText);
                    }
                },
                AppWorkspace: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.AppWorkspace);
                    }
                },
                ButtonFace: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ButtonFace);
                    }
                },
                ButtonHighlight: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ButtonHighlight);
                    }
                },
                ButtonShadow: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ButtonShadow);
                    }
                },
                Control: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Control);
                    }
                },
                ControlDark: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ControlDark);
                    }
                },
                ControlDarkDark: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ControlDarkDark);
                    }
                },
                ControlLight: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ControlLight);
                    }
                },
                ControlLightLight: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ControlLightLight);
                    }
                },
                ControlText: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ControlText);
                    }
                },
                Desktop: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Desktop);
                    }
                },
                GradientActiveCaption: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.GradientActiveCaption);
                    }
                },
                GradientInactiveCaption: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.GradientInactiveCaption);
                    }
                },
                GrayText: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.GrayText);
                    }
                },
                Highlight: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Highlight);
                    }
                },
                HighlightText: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.HighlightText);
                    }
                },
                HotTrack: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.HotTrack);
                    }
                },
                InactiveBorder: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.InactiveBorder);
                    }
                },
                InactiveCaption: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.InactiveCaption);
                    }
                },
                InactiveCaptionText: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.InactiveCaptionText);
                    }
                },
                Info: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Info);
                    }
                },
                InfoText: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.InfoText);
                    }
                },
                Menu: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Menu);
                    }
                },
                MenuBar: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MenuBar);
                    }
                },
                MenuHighlight: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MenuHighlight);
                    }
                },
                MenuText: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.MenuText);
                    }
                },
                ScrollBar: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.ScrollBar);
                    }
                },
                Window: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.Window);
                    }
                },
                WindowFrame: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.WindowFrame);
                    }
                },
                WindowText: {
                    get: function () {
                        return new System.Drawing.Color.$ctor1(System.Drawing.KnownColor.WindowText);
                    }
                }
            }
        }
    });

    Bridge.define("System.Windows.Forms.AutoScaleMode", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                Font: 1,
                Dpi: 2,
                Inherit: 3
            }
        }
    });

    Bridge.define("System.Windows.Forms.DataGridViewColumn", {
        fields: {
            Element: null,
            DataPropertyName: null
        },
        props: {
            HeaderText: {
                get: function () {
                    return this.Element.textContent;
                },
                set: function (value) {
                    this.Element.textContent = value;
                }
            },
            Name: {
                get: function () {
                    return this.Element.getAttribute("Name");
                },
                set: function (value) {
                    this.Element.setAttribute("Name", value);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this.Element = document.createElement("th");
            }
        }
    });

    Bridge.define("System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode", {
        $kind: "enum",
        statics: {
            fields: {
                EnableResizing: 0,
                DisableResizing: 1,
                AutoSize: 2
            }
        }
    });

    Bridge.define("System.Windows.Forms.DrawMode", {
        $kind: "enum",
        statics: {
            fields: {
                Normal: 0,
                OwnerDrawFixed: 1,
                OwnerDrawVariable: 2
            }
        }
    });

    Bridge.define("System.Windows.Forms.LinkLabel.Link");

    Bridge.define("System.Windows.Forms.LinkLabelLinkClickedEventArgs", {
        fields: {
            Button: 0,
            Link: null
        },
        ctors: {
            ctor: function (link) {
                this.$initialize();

            },
            $ctor1: function (link, button) {
                this.$initialize();

            }
        }
    });

    Bridge.define("System.Windows.Forms.MouseButtons", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                Left: 1048576,
                Right: 2097152,
                Middle: 4194304,
                XButton1: 8388608,
                XButton2: 16777216
            }
        },
        $flags: true
    });

    Bridge.define("System.Windows.Forms.NewRowEventArgs", {
        fields: {
            Row: null
        }
    });

    Bridge.define("System.Windows.Forms.ObjectCollection", {
        inherits: [System.Collections.Generic.IList$1(System.Object),System.Collections.ICollection,System.Collections.IEnumerable],
        fields: {
            _owner: null,
            _controls: null
        },
        props: {
            Owner: {
                get: function () {
                    return this._owner;
                }
            },
            Count: {
                get: function () {
                    return this._controls.Count;
                }
            },
            IsReadOnly: {
                get: function () {
                    return false;
                }
            }
        },
        alias: [
            "getItem", "System$Collections$Generic$IList$1$System$Object$getItem",
            "setItem", "System$Collections$Generic$IList$1$System$Object$setItem",
            "Count", "System$Collections$ICollection$Count",
            "Count", "System$Collections$Generic$ICollection$1$System$Object$Count",
            "IsReadOnly", "System$Collections$Generic$ICollection$1$System$Object$IsReadOnly",
            "add", "System$Collections$Generic$ICollection$1$System$Object$add",
            "clear", "System$Collections$Generic$ICollection$1$System$Object$clear",
            "contains", "System$Collections$Generic$ICollection$1$System$Object$contains",
            "copyTo$1", "System$Collections$Generic$ICollection$1$System$Object$copyTo",
            "copyTo", "System$Collections$ICollection$copyTo",
            "getEnumerator", ["System$Collections$Generic$IEnumerable$1$System$Object$getEnumerator", "System$Collections$Generic$IEnumerable$1$getEnumerator"],
            "indexOf", "System$Collections$Generic$IList$1$System$Object$indexOf",
            "insert", "System$Collections$Generic$IList$1$System$Object$insert",
            "remove", "System$Collections$Generic$ICollection$1$System$Object$remove",
            "removeAt", "System$Collections$Generic$IList$1$System$Object$removeAt"
        ],
        ctors: {
            ctor: function (owner) {
                this.$initialize();
                this._owner = owner;
                this._controls = new (System.Collections.Generic.List$1(System.Object)).ctor();
            }
        },
        methods: {
            getItem: function (index) {
                return this._controls.getItem(index);
            },
            setItem: function (index, value) {
                this._controls.setItem(index, value);
            },
            add: function (item) {
                var $t;
                this._owner.Element.appendChild(($t = document.createElement("option"), $t.value = this._controls.Count.toString(), $t.textContent = (System.String.concat(item, "")), $t));
                this._controls.add(item);
            },
            AddRange: function (item) {
                var $t;
                if (item == null || item.length === 0) {
                    return;
                }
                var frag = document.createDocumentFragment();
                for (var i = 0; i < item.length; i = (i + 1) | 0) {
                    frag.appendChild(($t = document.createElement("option"), $t.value = this._controls.Count.toString(), $t.textContent = (System.String.concat(item[System.Array.index(i, item)], "")), $t));
                    this._controls.add(item[System.Array.index(i, item)]);
                }
                this._owner.Element.appendChild(frag);
            },
            clear: function () {
                			var len = _owner.Element.childNodes.length;
                			while(len--)
                			{
                				_owner.Element.removeChild(_owner.Element.lastChild);
                			};
                			
                this._controls.clear();
            },
            contains: function (item) {
                return this._controls.contains(item);
            },
            copyTo$1: function (array, arrayIndex) {
                this._controls.copyTo(array, arrayIndex);
            },
            copyTo: function (array, arrayIndex) {
                this._controls.copyTo(Bridge.cast(array, System.Array.type(System.Object)), arrayIndex);
            },
            getEnumerator: function () {
                return this._controls.getEnumerator().$clone();
            },
            System$Collections$IEnumerable$getEnumerator: function () {
                return this._controls.getEnumerator().$clone();
            },
            indexOf: function (item) {
                return this._controls.indexOf(item);
            },
            insert: function (index, item) {
                var $t;
                this._owner.Element.insertBefore(($t = document.createElement("option"), $t.value = this._controls.Count.toString(), $t.textContent = (System.String.concat(item, "")), $t), this._owner.Element.childNodes[index]);
                this._controls.insert(index, item);
            },
            remove: function (item) {
                this._owner.Element.removeChild(this._owner.Element.childNodes[this._controls.indexOf(item)]);
                return this._controls.remove(item);
            },
            removeAt: function (index) {
                this._owner.Element.removeChild(this._owner.Element.childNodes[index]);
                this._controls.removeAt(index);
            }
        }
    });

    Bridge.define("System.Windows.Forms.Padding", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new System.Windows.Forms.Padding(); }
            }
        },
        fields: {
            Left: 0,
            Top: 0,
            Right: 0,
            Bottom: 0
        },
        ctors: {
            $ctor1: function (left, top, right, bottom) {
                this.$initialize();
                this.Left = left;
                this.Top = top;
                this.Right = right;
                this.Bottom = bottom;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1691078585, this.Left, this.Top, this.Right, this.Bottom]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, System.Windows.Forms.Padding)) {
                    return false;
                }
                return Bridge.equals(this.Left, o.Left) && Bridge.equals(this.Top, o.Top) && Bridge.equals(this.Right, o.Right) && Bridge.equals(this.Bottom, o.Bottom);
            },
            $clone: function (to) {
                var s = to || new System.Windows.Forms.Padding();
                s.Left = this.Left;
                s.Top = this.Top;
                s.Right = this.Right;
                s.Bottom = this.Bottom;
                return s;
            }
        }
    });

    Bridge.define("System.Windows.Forms.ComboBox", {
        inherits: [System.Windows.Forms.Control],
        fields: {
            Items: null,
            FormattingEnabled: false,
            ItemHeight: 0,
            DrawMode: 0,
            MinimumSize: null
        },
        ctors: {
            init: function () {
                this.MinimumSize = new System.Drawing.Size();
            },
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.Control.ctor.call(this, document.createElement("select"));
                this.Items = new System.Windows.Forms.ObjectCollection(this);
            }
        }
    });

    Bridge.define("System.Windows.Forms.TextBox", {
        inherits: [System.Windows.Forms.Control],
        props: {
            Text: {
                get: function () {
                    return this.Element.value;
                },
                set: function (value) {
                    Bridge.ensureBaseProperty(this, "Text").$System$Windows$Forms$Control$Text = value;
                    this.Element.value = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                var $t;
                this.$initialize();
                System.Windows.Forms.Control.ctor.call(this, ($t = document.createElement("input"), $t.type = "text", $t));

            }
        }
    });

    Bridge.define("System.Windows.Forms.ButtonBase", {
        inherits: [System.Windows.Forms.Control],
        fields: {
            AutoSize: false,
            UseVisualStyleBackColor: false
        },
        props: {
            Text: {
                get: function () {
                    return Bridge.ensureBaseProperty(this, "Text").$System$Windows$Forms$Control$Text;
                },
                set: function (value) {
                    Bridge.ensureBaseProperty(this, "Text").$System$Windows$Forms$Control$Text = value;
                    this.Element.textContent = value;
                }
            }
        },
        ctors: {
            ctor: function (element) {
                this.$initialize();
                System.Windows.Forms.Control.ctor.call(this, element);

            }
        }
    });

    Bridge.define("System.Windows.Forms.ContainerControl", {
        inherits: [System.Windows.Forms.Control],
        fields: {
            AutoScaleDimensions: null,
            AutoScaleMode: 0
        },
        ctors: {
            init: function () {
                this.AutoScaleDimensions = new System.Drawing.SizeF();
            },
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.Control.ctor.call(this, document.createElement("div"));

            }
        }
    });

    /** @namespace System.Windows.Forms */

    /**
     * TODO - add controls via html....
     *
     * @public
     * @class System.Windows.Forms.ControlCollection
     * @implements  System.Collections.Generic.IList$1
     * @implements  System.Collections.ICollection
     * @implements  System.Collections.IEnumerable
     */
    Bridge.define("System.Windows.Forms.ControlCollection", {
        inherits: [System.Collections.Generic.IList$1(System.Windows.Forms.Control),System.Collections.ICollection,System.Collections.IEnumerable],
        fields: {
            _owner: null,
            _controls: null
        },
        props: {
            Owner: {
                get: function () {
                    return this._owner;
                }
            },
            Count: {
                get: function () {
                    return this._controls.Count;
                }
            },
            IsReadOnly: {
                get: function () {
                    return false;
                }
            }
        },
        alias: [
            "getItem", "System$Collections$Generic$IList$1$System$Windows$Forms$Control$getItem",
            "setItem", "System$Collections$Generic$IList$1$System$Windows$Forms$Control$setItem",
            "Count", "System$Collections$ICollection$Count",
            "Count", "System$Collections$Generic$ICollection$1$System$Windows$Forms$Control$Count",
            "IsReadOnly", "System$Collections$Generic$ICollection$1$System$Windows$Forms$Control$IsReadOnly",
            "add", "System$Collections$Generic$ICollection$1$System$Windows$Forms$Control$add",
            "clear", "System$Collections$Generic$ICollection$1$System$Windows$Forms$Control$clear",
            "contains", "System$Collections$Generic$ICollection$1$System$Windows$Forms$Control$contains",
            "copyTo$1", "System$Collections$Generic$ICollection$1$System$Windows$Forms$Control$copyTo",
            "copyTo", "System$Collections$ICollection$copyTo",
            "getEnumerator", ["System$Collections$Generic$IEnumerable$1$System$Windows$Forms$Control$getEnumerator", "System$Collections$Generic$IEnumerable$1$getEnumerator"],
            "indexOf", "System$Collections$Generic$IList$1$System$Windows$Forms$Control$indexOf",
            "insert", "System$Collections$Generic$IList$1$System$Windows$Forms$Control$insert",
            "remove", "System$Collections$Generic$ICollection$1$System$Windows$Forms$Control$remove",
            "removeAt", "System$Collections$Generic$IList$1$System$Windows$Forms$Control$removeAt"
        ],
        ctors: {
            ctor: function (owner) {
                this.$initialize();
                this._owner = owner;
                this._controls = new (System.Collections.Generic.List$1(System.Windows.Forms.Control)).ctor();
            }
        },
        methods: {
            getItem: function (index) {
                return this._controls.getItem(index);
            },
            setItem: function (index, value) {
                this._controls.setItem(index, value);
            },
            add: function (item) {
                this._owner.Element.appendChild(item.Element);
                item._parent = this.Owner;
                item.Load();
                this._controls.add(item);
            },
            AddRange: function (item) {
                if (item == null || item.length === 0) {
                    return;
                }
                var frag = document.createDocumentFragment();
                for (var i = 0; i < item.length; i = (i + 1) | 0) {
                    frag.appendChild(item[System.Array.index(i, item)].Element);
                    item[System.Array.index(i, item)]._parent = this.Owner;
                    item[System.Array.index(i, item)].Load();
                    this._controls.add(item[System.Array.index(i, item)]);
                }
                this._owner.Element.appendChild(frag);
            },
            clear: function () {
                			var len = _owner.Element.childNodes.length;
                			while(len--)
                			{
                				_owner.Element.removeChild(_owner.Element.lastChild);
                			};
                			
                this._controls.clear();
            },
            contains: function (item) {
                return this._controls.contains(item);
            },
            copyTo$1: function (array, arrayIndex) {
                this._controls.copyTo(array, arrayIndex);
            },
            copyTo: function (array, arrayIndex) {
                this._controls.copyTo(Bridge.cast(array, System.Array.type(System.Windows.Forms.Control)), arrayIndex);
            },
            getEnumerator: function () {
                return this._controls.getEnumerator().$clone();
            },
            System$Collections$IEnumerable$getEnumerator: function () {
                return this._controls.getEnumerator().$clone();
            },
            indexOf: function (item) {
                return this._controls.indexOf(item);
            },
            insert: function (index, item) {
                this._owner.Element.insertBefore(item.Element, this._owner.Element.childNodes[index]);
                this._controls.insert(index, item);
            },
            remove: function (item) {
                this._owner.Element.removeChild(item.Element);
                return this._controls.remove(item);
            },
            removeAt: function (index) {
                this._owner.Element.removeChild(this._owner.Element.childNodes[index]);
                this._controls.removeAt(index);
            }
        }
    });

    Bridge.define("System.Windows.Forms.DataGridView", {
        inherits: [System.Windows.Forms.Control,System.ComponentModel.ISupportInitialize],
        fields: {
            ColumnHeadersHeightSizeMode: 0,
            Columns: null,
            Rows: null,
            table: null,
            dataSource: null
        },
        props: {
            Tag: {
                get: function () {
                    return this._tag;
                },
                set: function (value) {
                    this._tag = value;
                    if (Bridge.is(this._tag, System.String)) {
                        var str = (System.String.concat(this._tag, ""));
                        if (System.String.contains(str,",")) {
                            var arry = System.String.split(str, [44].map(function(i) {{ return String.fromCharCode(i); }}));
                            this.Element.className = arry[System.Array.index(0, arry)];
                            if (arry.length >= 2) {
                                this.table.className = arry[System.Array.index(1, arry)];
                                if (arry.length >= 3) {
                                    this.Columns.header.className = arry[System.Array.index(2, arry)];
                                } else {
                                    this.Columns.header.className = "";
                                }
                            } else {
                                this.table.className = "";
                                this.Columns.header.className = "";
                            }
                        } else {
                            this.Element.className = str;
                            this.table.className = "";
                            this.Columns.header.className = "";
                        }
                    } else {
                        this.table.className = "";
                        this.Element.className = "";
                        this.Columns.header.className = "";
                    }
                }
            },
            DataSource: {
                get: function () {
                    return this.dataSource;
                },
                set: function (value) {
                    if (!Bridge.referenceEquals(value, this.dataSource)) {
                        if (this.dataSource != null) {
                            if (Bridge.is(this.dataSource, System.Data.DataTable)) {
                                var dt = Bridge.unbox(this.dataSource);

                                dt.removeNewRowEvent(Bridge.fn.cacheBind(this, this.OnNewRowEvent));
                            }
                        }

                        this.dataSource = value;

                        if (this.dataSource != null && Bridge.is(this.dataSource, System.Data.DataTable)) {
                            var dt1 = Bridge.unbox(this.dataSource);

                            dt1.addNewRowEvent(Bridge.fn.cacheBind(this, this.OnNewRowEvent));
                        }
                    }
                }
            }
        },
        alias: [
            "BeginInit", "System$ComponentModel$ISupportInitialize$BeginInit",
            "EndInit", "System$ComponentModel$ISupportInitialize$EndInit"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.Control.ctor.call(this, document.createElement("div"));
                this.table = document.createElement("table");
                this.Element.appendChild(this.table);

                this.Element.style.overflow = "auto";

                this.Columns = new System.Windows.Forms.DataGridViewColumnCollection(this, this.table);
                this.Rows = new System.Windows.Forms.DataGridViewRowCollection(this, this.table);

                this.TabStop = false;

                this.Element.setAttribute("scope", "table");
            }
        },
        methods: {
            BeginInit: function () {

            },
            EndInit: function () {

            },
            OnNewRowEvent: function (sender, args) {
                this.Rows.add(args.Row);
            }
        }
    });

    /**
     * TODO - add controls via html....
     *
     * @public
     * @class System.Windows.Forms.DataGridViewColumnCollection
     * @implements  System.Collections.Generic.IList$1
     * @implements  System.Collections.ICollection
     * @implements  System.Collections.IEnumerable
     */
    Bridge.define("System.Windows.Forms.DataGridViewColumnCollection", {
        inherits: [System.Collections.Generic.IList$1(System.Windows.Forms.DataGridViewColumn),System.Collections.ICollection,System.Collections.IEnumerable],
        fields: {
            _owner: null,
            header: null,
            _controls: null
        },
        props: {
            Owner: {
                get: function () {
                    return this._owner;
                }
            },
            Count: {
                get: function () {
                    return this._controls.Count;
                }
            },
            IsReadOnly: {
                get: function () {
                    return false;
                }
            }
        },
        alias: [
            "getItem", "System$Collections$Generic$IList$1$System$Windows$Forms$DataGridViewColumn$getItem",
            "setItem", "System$Collections$Generic$IList$1$System$Windows$Forms$DataGridViewColumn$setItem",
            "Count", "System$Collections$ICollection$Count",
            "Count", "System$Collections$Generic$ICollection$1$System$Windows$Forms$DataGridViewColumn$Count",
            "IsReadOnly", "System$Collections$Generic$ICollection$1$System$Windows$Forms$DataGridViewColumn$IsReadOnly",
            "add", "System$Collections$Generic$ICollection$1$System$Windows$Forms$DataGridViewColumn$add",
            "clear", "System$Collections$Generic$ICollection$1$System$Windows$Forms$DataGridViewColumn$clear",
            "contains", "System$Collections$Generic$ICollection$1$System$Windows$Forms$DataGridViewColumn$contains",
            "copyTo$1", "System$Collections$Generic$ICollection$1$System$Windows$Forms$DataGridViewColumn$copyTo",
            "copyTo", "System$Collections$ICollection$copyTo",
            "getEnumerator", ["System$Collections$Generic$IEnumerable$1$System$Windows$Forms$DataGridViewColumn$getEnumerator", "System$Collections$Generic$IEnumerable$1$getEnumerator"],
            "indexOf", "System$Collections$Generic$IList$1$System$Windows$Forms$DataGridViewColumn$indexOf",
            "insert", "System$Collections$Generic$IList$1$System$Windows$Forms$DataGridViewColumn$insert",
            "remove", "System$Collections$Generic$ICollection$1$System$Windows$Forms$DataGridViewColumn$remove",
            "removeAt", "System$Collections$Generic$IList$1$System$Windows$Forms$DataGridViewColumn$removeAt"
        ],
        ctors: {
            ctor: function (owner, table) {
                this.$initialize();
                this._owner = owner;
                this._controls = new (System.Collections.Generic.List$1(System.Windows.Forms.DataGridViewColumn)).ctor();

                this.header = table.createTHead();
                table.appendChild(this.header);
            }
        },
        methods: {
            getItem: function (index) {
                return this._controls.getItem(index);
            },
            setItem: function (index, value) {
                this._controls.setItem(index, value);
            },
            add: function (item) {

                this.header.appendChild(item.Element);
                this._controls.add(item);
            },
            AddRange: function (item) {
                if (item == null || item.length === 0) {
                    return;
                }
                var frag = document.createDocumentFragment();
                for (var i = 0; i < item.length; i = (i + 1) | 0) {
                    frag.appendChild(item[System.Array.index(i, item)].Element);
                    this._controls.add(item[System.Array.index(i, item)]);
                }
                this.header.appendChild(frag);
            },
            clear: function () {
                			var len = header.childNodes.length;
                			while(len--)
                			{
                				header.removeChild(header.lastChild);
                			};
                			
                this._controls.clear();
            },
            contains: function (item) {
                return this._controls.contains(item);
            },
            copyTo$1: function (array, arrayIndex) {
                this._controls.copyTo(array, arrayIndex);
            },
            copyTo: function (array, arrayIndex) {
                this._controls.copyTo(Bridge.cast(array, System.Array.type(System.Windows.Forms.DataGridViewColumn)), arrayIndex);
            },
            getEnumerator: function () {
                return this._controls.getEnumerator().$clone();
            },
            System$Collections$IEnumerable$getEnumerator: function () {
                return this._controls.getEnumerator().$clone();
            },
            indexOf: function (item) {
                return this._controls.indexOf(item);
            },
            insert: function (index, item) {
                this.header.insertBefore(item.Element, this.header.childNodes[index]);
                this._controls.insert(index, item);
            },
            remove: function (item) {
                this.header.removeChild(item.Element);
                return this._controls.remove(item);
            },
            removeAt: function (index) {
                this.header.removeChild(this.header.childNodes[index]);
                this._controls.removeAt(index);
            }
        }
    });

    /**
     * TODO - add controls via html....
     *
     * @public
     * @class System.Windows.Forms.DataGridViewRowCollection
     * @implements  System.Collections.Generic.IList$1
     * @implements  System.Collections.ICollection
     * @implements  System.Collections.IEnumerable
     */
    Bridge.define("System.Windows.Forms.DataGridViewRowCollection", {
        inherits: [System.Collections.Generic.IList$1(System.Data.DataRow),System.Collections.ICollection,System.Collections.IEnumerable],
        fields: {
            _owner: null,
            body: null,
            _controls: null
        },
        props: {
            Owner: {
                get: function () {
                    return this._owner;
                }
            },
            Count: {
                get: function () {
                    return this._controls.Count;
                }
            },
            IsReadOnly: {
                get: function () {
                    return false;
                }
            }
        },
        alias: [
            "getItem", "System$Collections$Generic$IList$1$System$Data$DataRow$getItem",
            "setItem", "System$Collections$Generic$IList$1$System$Data$DataRow$setItem",
            "Count", "System$Collections$ICollection$Count",
            "Count", "System$Collections$Generic$ICollection$1$System$Data$DataRow$Count",
            "IsReadOnly", "System$Collections$Generic$ICollection$1$System$Data$DataRow$IsReadOnly",
            "add", "System$Collections$Generic$ICollection$1$System$Data$DataRow$add",
            "clear", "System$Collections$Generic$ICollection$1$System$Data$DataRow$clear",
            "contains", "System$Collections$Generic$ICollection$1$System$Data$DataRow$contains",
            "copyTo$1", "System$Collections$Generic$ICollection$1$System$Data$DataRow$copyTo",
            "copyTo", "System$Collections$ICollection$copyTo",
            "getEnumerator", ["System$Collections$Generic$IEnumerable$1$System$Data$DataRow$getEnumerator", "System$Collections$Generic$IEnumerable$1$getEnumerator"],
            "indexOf", "System$Collections$Generic$IList$1$System$Data$DataRow$indexOf",
            "insert", "System$Collections$Generic$IList$1$System$Data$DataRow$insert",
            "remove", "System$Collections$Generic$ICollection$1$System$Data$DataRow$remove",
            "removeAt", "System$Collections$Generic$IList$1$System$Data$DataRow$removeAt"
        ],
        ctors: {
            ctor: function (owner, table) {
                this.$initialize();
                this._owner = owner;
                this._controls = new (System.Collections.Generic.List$1(System.Data.DataRow)).ctor();

                this.body = table.createTBody();
                table.appendChild(this.body);
            }
        },
        methods: {
            getItem: function (index) {
                return this._controls.getItem(index);
            },
            setItem: function (index, value) {
                this._controls.setItem(index, value);
            },
            add: function (item) {
                this.body.appendChild(item.Element);
                this._controls.add(item);
            },
            AddRange: function (item) {
                if (item == null || item.length === 0) {
                    return;
                }
                var frag = document.createDocumentFragment();
                for (var i = 0; i < item.length; i = (i + 1) | 0) {
                    frag.appendChild(item[System.Array.index(i, item)].Element);
                    this._controls.add(item[System.Array.index(i, item)]);
                }
                this.body.appendChild(frag);
            },
            clear: function () {
                			var len = body.childNodes.length;
                			while(len--)
                			{
                				body.removeChild(body.lastChild);
                			};
                			
                this._controls.clear();
            },
            contains: function (item) {
                return this._controls.contains(item);
            },
            copyTo$1: function (array, arrayIndex) {
                this._controls.copyTo(array, arrayIndex);
            },
            copyTo: function (array, arrayIndex) {
                this._controls.copyTo(Bridge.cast(array, System.Array.type(System.Data.DataRow)), arrayIndex);
            },
            getEnumerator: function () {
                return this._controls.getEnumerator().$clone();
            },
            System$Collections$IEnumerable$getEnumerator: function () {
                return this._controls.getEnumerator().$clone();
            },
            indexOf: function (item) {
                return this._controls.indexOf(item);
            },
            insert: function (index, item) {
                this.body.insertBefore(item.Element, this.body.childNodes[index]);
                this._controls.insert(index, item);
            },
            remove: function (item) {
                this.body.removeChild(item.Element);
                return this._controls.remove(item);
            },
            removeAt: function (index) {
                this.body.removeChild(this.body.childNodes[index]);
                this._controls.removeAt(index);
            }
        }
    });

    Bridge.define("System.Windows.Forms.DataGridViewTextBoxColumn", {
        inherits: [System.Windows.Forms.DataGridViewColumn]
    });

    Bridge.define("System.Windows.Forms.GroupBox", {
        inherits: [System.Windows.Forms.Control],
        fields: {
            legend: null,
            panel: null
        },
        props: {
            Text: {
                get: function () {
                    return this.legend.textContent;
                },
                set: function (value) {
                    Bridge.ensureBaseProperty(this, "Text").$System$Windows$Forms$Control$Text = value;
                    this.legend.textContent = value;
                }
            },
            Tag: {
                get: function () {
                    return this._tag;
                },
                set: function (value) {
                    this._tag = value;
                    if (Bridge.is(this._tag, System.String)) {
                        var str = (System.String.concat(this._tag, ""));
                        if (System.String.contains(str,",")) {
                            var arry = System.String.split(str, [44].map(function(i) {{ return String.fromCharCode(i); }}));
                            this.Element.className = arry[System.Array.index(0, arry)];
                            if (arry.length === 3) {
                                this.legend.className = arry[System.Array.index(1, arry)];
                                this.panel.Element.className = arry[System.Array.index(2, arry)];
                            } else {
                                this.legend.className = "";
                                this.panel.Element.className = "";
                            }
                        } else {
                            this.Element.className = str;
                            this.legend.className = "";
                            this.panel.Element.className = "";
                        }
                    } else {
                        this.Element.className = "";
                        this.legend.className = "";
                        this.panel.Element.className = "";
                    }
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.Control.ctor.call(this, document.createElement("div"));
                this.panel = new System.Windows.Forms.Panel();

                this.Element.appendChild((this.legend = document.createElement("div")));
                this.Element.appendChild(this.panel.Element);
                this.panel.Element.style.position = "relative";
                this.Controls._owner = this.panel;
            }
        }
    });

    Bridge.define("System.Windows.Forms.Label", {
        inherits: [System.Windows.Forms.Control],
        props: {
            Text: {
                get: function () {
                    return this.Element.textContent;
                },
                set: function (value) {
                    Bridge.ensureBaseProperty(this, "Text").$System$Windows$Forms$Control$Text = value;
                    this.Element.textContent = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.Control.ctor.call(this, document.createElement("span"));
                this.TabStop = false;
            }
        }
    });

    Bridge.define("System.Windows.Forms.LinkLabel", {
        inherits: [System.Windows.Forms.Control],
        events: {
            LinkClicked: null
        },
        props: {
            Text: {
                get: function () {
                    return this.Element.textContent;
                },
                set: function (value) {
                    Bridge.ensureBaseProperty(this, "Text").$System$Windows$Forms$Control$Text = value;
                    this.Element.textContent = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.Control.ctor.call(this, document.createElement("a"));
                this.TabStop = false;
                //Element.As<HTMLAnchorElement>().Href = "#";
                this.Element.style.cursor = "pointer";
            }
        },
        methods: {
            OnClick: function (e) {
                System.Windows.Forms.Control.prototype.OnClick.call(this, e);

                if (!Bridge.staticEquals(this.LinkClicked, null)) {
                    this.LinkClicked(this, new System.Windows.Forms.LinkLabelLinkClickedEventArgs.ctor(null));
                }
            }
        }
    });

    Bridge.define("System.Windows.Forms.ListBox", {
        inherits: [System.Windows.Forms.Control],
        fields: {
            Items: null,
            FormattingEnabled: false,
            ItemHeight: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.Control.ctor.call(this, document.createElement("select"));
                this.Element.multiple = true;
                this.Items = new System.Windows.Forms.ObjectCollection(this);
            }
        }
    });

    Bridge.define("System.Windows.Forms.ProgressBar", {
        inherits: [System.Windows.Forms.Control],
        fields: {
            progressBar: null,
            _value: 0
        },
        props: {
            ForeColor: {
                get: function () {
                    return Bridge.ensureBaseProperty(this, "ForeColor").$System$Windows$Forms$Control$ForeColor.$clone();
                },
                set: function (value) {
                    Bridge.ensureBaseProperty(this, "ForeColor").$System$Windows$Forms$Control$ForeColor = value.$clone();
                    if (this._init) {
                        this.progressBar.style.backgroundColor = value.ToHtml();
                    }
                }
            },
            Value: {
                get: function () {
                    return this._value;
                },
                set: function (value) {
                    if (value < 0) {
                        value = 0;
                    }
                    if (value > 100) {
                        value = 100;
                    }
                    this._value = value;
                    if (this._init) {
                        this.progressBar.style.width = this._value + "%";
                    }
                }
            },
            Tag: {
                get: function () {
                    return this._tag;
                },
                set: function (value) {
                    this._tag = value;
                    if (Bridge.is(this._tag, System.String)) {
                        var str = (System.String.concat(this._tag, ""));
                        if (System.String.contains(str,",")) {
                            var arry = System.String.split(str, [44].map(function(i) {{ return String.fromCharCode(i); }}));
                            this.Element.className = arry[System.Array.index(0, arry)];
                            if (arry.length === 2) {
                                this.progressBar.className = arry[System.Array.index(1, arry)];
                            } else {
                                this.progressBar.className = "";
                            }
                        } else {
                            this.Element.className = str;
                            this.progressBar.className = "";
                        }
                    } else {
                        this.Element.className = "";
                        this.progressBar.className = "";
                    }
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.Control.ctor.call(this, document.createElement("div"));
                this.Element.appendChild((this.progressBar = document.createElement("div")));
                this.TabStop = false;
                this.Element.setAttribute("scope", "progress");
            }
        }
    });

    Bridge.define("System.ComboBoxResize", {
        inherits: [System.Windows.Forms.ComboBox],
        props: {
            AutoSize: {
                get: function () {
                    return Bridge.ensureBaseProperty(this, "AutoSize").$System$Windows$Forms$Control$AutoSize;
                },
                set: function (value) {
                    Bridge.ensureBaseProperty(this, "AutoSize").$System$Windows$Forms$Control$AutoSize = value;
                }
            }
        }
    });

    Bridge.define("System.TextBoxResize", {
        inherits: [System.Windows.Forms.TextBox],
        props: {
            AutoSize: {
                get: function () {
                    return Bridge.ensureBaseProperty(this, "AutoSize").$System$Windows$Forms$Control$AutoSize;
                },
                set: function (value) {
                    Bridge.ensureBaseProperty(this, "AutoSize").$System$Windows$Forms$Control$AutoSize = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.TextBox.ctor.call(this);
                this.AutoSize = false;

            }
        }
    });

    Bridge.define("System.Windows.Forms.Button", {
        inherits: [System.Windows.Forms.ButtonBase],
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.ButtonBase.ctor.call(this, document.createElement("button"));

            }
        }
    });

    Bridge.define("System.Windows.Forms.CheckBox", {
        inherits: [System.Windows.Forms.ButtonBase],
        statics: {
            fields: {
                checkboxToLabelId: 0
            }
        },
        fields: {
            checkBox: null,
            text: null
        },
        props: {
            Checked: {
                get: function () {
                    return this.checkBox.checked;
                },
                set: function (value) {
                    this.checkBox.checked = value;
                }
            },
            Text: {
                get: function () {
                    return this.text.textContent;
                },
                set: function (value) {
                    this.text.textContent = value;
                }
            },
            Tag: {
                get: function () {
                    return this._tag;
                },
                set: function (value) {
                    this._tag = value;
                    if (Bridge.is(this._tag, System.String)) {
                        var str = (System.String.concat(this._tag, ""));
                        if (System.String.contains(str,",")) {
                            var arry = System.String.split(str, [44].map(function(i) {{ return String.fromCharCode(i); }}));
                            this.Element.className = arry[System.Array.index(0, arry)];
                            if (arry.length === 3) {
                                this.checkBox.className = arry[System.Array.index(1, arry)];
                                this.text.className = arry[System.Array.index(2, arry)];
                            } else {
                                this.checkBox.className = "";
                                this.text.className = "";
                            }
                        } else {
                            this.Element.className = str;
                            this.checkBox.className = "";
                            this.text.className = "";
                        }
                    } else {
                        this.Element.className = "";
                        this.checkBox.className = "";
                        this.text.className = "";
                    }
                }
            },
            TabIndex: {
                get: function () {
                    return this._tabIndex;
                },
                set: function (value) {
                    if (this._init) {
                        this._tabIndex = value;
                        if (this.TabStop) {
                            this.checkBox.tabIndex = value;
                        } else {
                            this.checkBox.removeAttribute("TabIndex");
                        }
                    }
                }
            }
        },
        ctors: {
            ctor: function () {
                var $t, $t1;
                this.$initialize();
                System.Windows.Forms.ButtonBase.ctor.call(this, document.createElement("div"));
                var id = Bridge.identity(System.Windows.Forms.CheckBox.checkboxToLabelId, ($t = (System.Windows.Forms.CheckBox.checkboxToLabelId + 1) | 0, System.Windows.Forms.CheckBox.checkboxToLabelId = $t, $t));
                var ids = "__check" + (id.toString() || "");



                this.Element.appendChild(((this.checkBox = ($t1 = document.createElement("input"), $t1.type = "checkbox", $t1.id = ids, $t1))));
                this.Element.appendChild((this.text = ($t1 = document.createElement("label"), $t1.htmlFor = ids, $t1)));

                this.checkBox.style.cursor = "pointer";
                this.text.style.cursor = "pointer";
            }
        }
    });

    Bridge.define("System.Windows.Forms.Form", {
        inherits: [System.Windows.Forms.ContainerControl],
        statics: {
            fields: {
                FormTopBorder: 0,
                FormBottonBorder: 0,
                FormLeftBorder: 0,
                FormRightBorder: 0
            },
            ctors: {
                init: function () {
                    this.FormTopBorder = 27;
                    this.FormBottonBorder = 6;
                    this.FormLeftBorder = 6;
                    this.FormRightBorder = 6;
                }
            },
            methods: {
                GetClientSize: function (size) {
                    return new System.Drawing.Size.$ctor1(((size.Width - (((System.Windows.Forms.Form.FormLeftBorder + System.Windows.Forms.Form.FormRightBorder) | 0))) | 0), ((size.Height - (((System.Windows.Forms.Form.FormTopBorder + System.Windows.Forms.Form.FormBottonBorder) | 0))) | 0));
                },
                SetSize: function (clientSize) {
                    return new System.Drawing.Size.$ctor1(((clientSize.Width + (((System.Windows.Forms.Form.FormLeftBorder + System.Windows.Forms.Form.FormRightBorder) | 0))) | 0), ((clientSize.Height + (((System.Windows.Forms.Form.FormTopBorder + System.Windows.Forms.Form.FormBottonBorder) | 0))) | 0));
                }
            }
        },
        fields: {
            Text: null
        },
        props: {
            Font: {
                get: function () {
                    return Bridge.ensureBaseProperty(this, "Font").$System$Windows$Forms$Control$Font;
                },
                set: function (value) {
                    Bridge.ensureBaseProperty(this, "Font").$System$Windows$Forms$Control$Font = value;
                }
            },
            ClientSize: {
                get: function () {
                    return System.Windows.Forms.Form.GetClientSize(this.Size.$clone());
                },
                set: function (value) {
                    this.Size = System.Windows.Forms.Form.SetSize(value.$clone());
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.ContainerControl.ctor.call(this);
                this.BackColor = System.Drawing.SystemColors.Control.$clone();
                this.Element.style.borderTop = "solid " + System.Windows.Forms.Form.FormTopBorder + "px" + " " + System.Drawing.Color.op_Implicit$1(System.Drawing.Color.CornflowerBlue);
                this.Element.style.borderBottom = "solid " + System.Windows.Forms.Form.FormBottonBorder + "px" + " " + System.Drawing.Color.op_Implicit$1(System.Drawing.Color.CornflowerBlue);

                this.Element.style.borderLeft = "solid " + System.Windows.Forms.Form.FormLeftBorder + "px" + " " + System.Drawing.Color.op_Implicit$1(System.Drawing.Color.CornflowerBlue);
                this.Element.style.borderRight = "solid " + System.Windows.Forms.Form.FormRightBorder + "px" + " " + System.Drawing.Color.op_Implicit$1(System.Drawing.Color.CornflowerBlue);

                this.TabStop = false;
            }
        },
        methods: {
            Dispose: function (disposing) {

            },
            Show: function () {
                document.body.appendChild(this.Element);
            }
        }
    });

    Bridge.define("System.Windows.Forms.Panel", {
        inherits: [System.Windows.Forms.ContainerControl],
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Windows.Forms.ContainerControl.ctor.call(this);
                this.TabStop = false;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTeXN0ZW0uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIldpbmRvd3MvRm9ybXMvQ29udHJvbC5jcyIsIkRhdGEvRGF0YUNvbHVtbi5jcyIsIkRhdGEvRGF0YUNvbHVtbkNvbGxlY3Rpb24uY3MiLCJEYXRhL0RhdGFSb3cuY3MiLCJEYXRhL0RhdGFSb3dDb2xsZWN0aW9uLmNzIiwiRGF0YS9EYXRhVGFibGUuY3MiLCJEcmF3aW5nL0NvbG9yLmNzIiwiRHJhd2luZy9Gb250LmNzIiwiRHJhd2luZy9Qb2ludC5jcyIsIkRyYXdpbmcvU2l6ZS5jcyIsIkRyYXdpbmcvU2l6ZUYuY3MiLCJEcmF3aW5nL1N5c3RlbUNvbG9ycy5jcyIsIldpbmRvd3MvRm9ybXMvRGF0YUdyaWRWaWV3Q29sdW1uLmNzIiwiV2luZG93cy9Gb3Jtcy9MaW5rTGFiZWxMaW5rQ2xpY2tlZEV2ZW50SGFuZGxlci5jcyIsIldpbmRvd3MvRm9ybXMvT2JqZWN0Q29sbGVjdGlvbi5jcyIsIldpbmRvd3MvRm9ybXMvUGFkZGluZy5jcyIsIldpbmRvd3MvRm9ybXMvQ29tYm9Cb3guY3MiLCJXaW5kb3dzL0Zvcm1zL1RleHRCb3guY3MiLCJXaW5kb3dzL0Zvcm1zL0J1dHRvbkJhc2UuY3MiLCJXaW5kb3dzL0Zvcm1zL0NvbnRhaW5lckNvbnRyb2wuY3MiLCJXaW5kb3dzL0Zvcm1zL0NvbnRyb2xDb2xsZWN0aW9uLmNzIiwiV2luZG93cy9Gb3Jtcy9EYXRhR3JpZFZpZXcuY3MiLCJXaW5kb3dzL0Zvcm1zL0RhdGFHcmlkVmlld0NvbHVtbkNvbGxlY3Rpb24uY3MiLCJXaW5kb3dzL0Zvcm1zL0RhdGFHcmlkVmlld1Jvd0NvbGxlY3Rpb24uY3MiLCJXaW5kb3dzL0Zvcm1zL0dyb3VwQm94LmNzIiwiV2luZG93cy9Gb3Jtcy9MYWJlbC5jcyIsIldpbmRvd3MvRm9ybXMvTGlua0xhYmVsLmNzIiwiV2luZG93cy9Gb3Jtcy9Qcm9ncmVzc0Jhci5jcyIsIkNvbWJvQm94UmVzaXplLmNzIiwiVGV4dEJveFJlc2l6ZS5jcyIsIldpbmRvd3MvRm9ybXMvQnV0dG9uLmNzIiwiV2luZG93cy9Gb3Jtcy9DaGVja0JveC5jcyIsIldpbmRvd3MvRm9ybXMvRm9ybS5jcyIsIldpbmRvd3MvRm9ybXMvUGFuZWwuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFXbUNBLE9BQU9BOzs7b0JBQXNDQSxrQ0FBNkJBOzs7OztvQkFJM0ZBLE9BQU9BOzs7b0JBR1RBLGlCQUFZQTs7b0JBRVpBLDBCQUFxQkE7b0JBQ3JCQSx5QkFBb0JBOzs7Ozs7b0JBTUFBLE9BQU9BOzs7b0JBQzNCQSxnQkFBV0E7b0JBQ1hBLGdDQUEyQkE7Ozs7O29CQUtMQSxPQUFPQTs7Ozs7b0JBa0JaQSxPQUFPQTs7O29CQUN4QkEsYUFBUUE7b0JBQ1JBLElBQUdBO3dCQUVDQTt3QkFDQUE7O3dCQUlBQSwyQkFBc0JBO3dCQUN0QkEsNEJBQXVCQTs7Ozs7O29CQUtQQSxPQUFPQTs7O29CQUMzQkEsZ0JBQVdBO29CQUNYQSxnQkFBV0E7Ozs7O29CQUlpQkEsT0FBT0E7OztvQkFDbkNBLGlCQUFZQTtvQkFDWkEsSUFBR0E7d0JBRUNBLHdCQUFtQkE7O3dCQUluQkE7Ozs7OztvQkFRRkEsT0FBT0E7OztvQkFHVEEsa0JBQWFBO29CQUNiQSxxQ0FBZ0NBOzs7OztvQkFPOUJBLE9BQU9BOzs7b0JBR1RBLGdCQUFXQTtvQkFDWEE7Ozs7O29CQU9FQSxPQUFPQTs7O29CQUdUQSxpQkFBWUE7b0JBQ1pBOzs7Ozs7Ozs7Ozs7OztvQkF1RUVBLE9BQU9BOzs7b0JBR1RBLFlBQU9BO29CQUNQQSxJQUFHQTt3QkFFQ0EseUJBQW9CQSxDQUFDQTs7d0JBSXJCQTs7b0JBRUpBOzs7OztvQkFNeUJBLE9BQU9BOzs7b0JBQ2hDQSxhQUFRQTtvQkFDUkEsSUFBR0EsY0FBU0E7d0JBRVJBO3dCQUNBQTs7d0JBSUFBLDhCQUF5QkE7d0JBQ3pCQSxnQ0FBMkJB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QU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7Ozs7O3dCQVFqQkEsT0FBT0EsSUFBSUEsNEJBQU1BOzs7Ozt3QkFRakJBLE9BQU9BLElBQUlBLDRCQUFNQTs7Ozs7d0JBUWpCQSxPQUFPQSxJQUFJQSw0QkFBTUE7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QWFBO29CQUNiQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQSxnREFBaUJBOzs7b0JBS2pCQSw4R0FBZ0JBO29CQUNoQkEsOEdBQWdCQTtvQkFDaEJBLDhHQUFnQkE7b0JBQ2hCQSw4R0FBZ0JBO29CQUNoQkEsZ0hBQWtCQTtvQkFDbEJBLGdIQUFrQkE7b0JBQ2xCQSxnSEFBa0JBO29CQUNsQkEsOEdBQWdCQTtvQkFDaEJBLDhHQUFnQkE7b0JBQ2hCQSw4R0FBZ0JBO29CQUNoQkEsOEdBQWdCQTtvQkFDaEJBLDhHQUFnQkE7b0JBQ2hCQSwrR0FBaUJBO29CQUNqQkEsK0dBQWlCQTtvQkFDakJBLGdIQUFrQkE7b0JBQ2xCQSxnSEFBa0JBO29CQUNsQkEsK0dBQWlCQTtvQkFDakJBLCtHQUFpQkE7b0JBQ2pCQSwrR0FBaUJBO29CQUNqQkEsK0dBQWlCQTtvQkFDakJBLCtHQUFpQkE7b0JBQ2pCQSwrR0FBaUJBO29CQUNqQkEsK0dBQWlCQTtvQkFDakJBLCtHQUFpQkE7b0JBQ2pCQSwrR0FBaUJBO29CQUNqQkEsK0dBQWlCQTtvQkFDakJBLGdIQUFrQkE7b0JBQ2xCQSxnSEFBa0JBO29CQUNsQkEsK0dBQWlCQTtvQkFDakJBLCtHQUFpQkE7b0JBQ2pCQSwrR0FBaUJBO29CQUNqQkEsK0dBQWlCQTtvQkFDakJBLCtHQUFpQkE7OztvQkFNakJBLFFBQVVBOztvQkFFVkE7b0JBQ0FBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBUUE7b0JBQ1JBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFRQTtvQkFDUkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVFBO29CQUNSQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBUUE7b0JBQ1JBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFRQTtvQkFDUkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVFBO29CQUNSQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBUUE7b0JBQ1JBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLCtCQUFVQTtvQkFDVkEsK0JBQVVBO29CQUNWQSwrQkFBVUE7b0JBQ1ZBLGdDQUFTQTtvQkFDVEEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVNBO29CQUNUQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBU0E7b0JBQ1RBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFTQTtvQkFDVEEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVNBO29CQUNUQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBU0E7b0JBQ1RBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JBQ1ZBLGdDQUFVQTtvQkFDVkEsZ0NBQVVBO29CQUNWQSxnQ0FBVUE7b0JB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V0FBV0Esd0RBQThCQTtnQkFDcEVBLGlDQUE0QkEsV0FBV0EseURBQStCQTs7Z0JBRXRFQTs7OzsrQkFpQjJCQTs7OztnQkFRM0JBLDBCQUF1RUE7Ozs7Ozs7Ozs7O2dCQ3RDdkVBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLldpbmRvd3MuRm9ybXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENvbnRyb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQgeyByZXR1cm4gRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJOYW1lXCIpOyB9IHNldCB7IEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiTmFtZVwiLCB2YWx1ZSk7IH0gfVxyXG4gICAgICAgIHByaXZhdGUgUG9pbnQgX2xvY2F0aW9uO1xyXG4gICAgICAgIHB1YmxpYyBQb2ludCBMb2NhdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9sb2NhdGlvbjsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xvY2F0aW9uID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgRWxlbWVudC5zdHlsZS5sZWZ0ID0gX2xvY2F0aW9uLlggKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBFbGVtZW50LnN0eWxlLnRvcCA9IF9sb2NhdGlvbi5ZICsgXCJweFwiO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIF92aXNpYmxlO1xyXG4gICAgICAgIHB1YmxpYyBib29sIFZpc2libGUgeyBnZXQgeyByZXR1cm4gX3Zpc2libGU7IH0gc2V0IHtcclxuICAgICAgICAgICAgICAgIF92aXNpYmxlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBfdmlzaWJsZSA/IFwiaW5oZXJpdFwiIDogXCJoaWRkZW5cIjsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBDb250cm9sIF9wYXJlbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBDb250cm9sIFBhcmVudCB7IGdldCB7IHJldHVybiBfcGFyZW50OyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIEZvcm0gR2V0Rm9ybSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QYXJlbnQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5QYXJlbnQgaXMgRm9ybSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuUGFyZW50LkFzPEZvcm0+KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5QYXJlbnQuR2V0Rm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFNpemUgX3NpemU7XHJcbiAgICAgICAgcHVibGljIFNpemUgU2l6ZSB7IGdldCB7IHJldHVybiBfc2l6ZTsgfSBzZXQge1xyXG4gICAgICAgICAgICAgICAgX3NpemUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmKF9hdXRvU2l6ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50LnN0eWxlLndpZHRoID0gXCJhdXRvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50LnN0eWxlLndpZHRoID0gX3NpemUuV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBfc2l6ZS5IZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIF90YWJTdG9wO1xyXG4gICAgICAgIHB1YmxpYyBib29sIFRhYlN0b3AgeyBnZXQgeyByZXR1cm4gX3RhYlN0b3A7IH0gc2V0IHtcclxuICAgICAgICAgICAgICAgIF90YWJTdG9wID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBUYWJJbmRleCA9IF90YWJJbmRleDtcclxuICAgICAgICAgICAgfSB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBpbnQgX3RhYkluZGV4O1xyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGludCBUYWJJbmRleCB7IGdldCB7IHJldHVybiBfdGFiSW5kZXg7IH0gc2V0IHtcclxuICAgICAgICAgICAgICAgIF90YWJJbmRleCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYoVGFiU3RvcClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50LnRhYkluZGV4ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJUYWJJbmRleFwiKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgc3RyaW5nIFRleHQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcml2YXRlIENvbG9yIF9iYWNrQ29sb3I7XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgQ29sb3IgQmFja0NvbG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX2JhY2tDb2xvcjsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2JhY2tDb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBfYmFja0NvbG9yLlRvSHRtbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgX2VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgRW5hYmxlZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9lbmFibGVkOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfZW5hYmxlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgQXBwbHlEaXNhYmxlZCgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIF9yZWFkb25seSA9IGZhbHNlO1xyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgUmVhZE9ubHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfcmVhZG9ubHk7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9yZWFkb25seSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgQXBwbHlSZWFkb25seSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBBcHBseURpc2FibGVkKFJldHlwZWQuZG9tLkhUTUxFbGVtZW50IGVsZW1lbnQgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZWxlbWVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gRWxlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihFbmFibGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImRpc2FibGVkXCIpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGlzYWJsZWRcIikpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBMb2FkKClcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIE9uTG9hZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBPbkxvYWQoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBDb2xvciBGb3JlQ29sb3IgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBBcHBseVJlYWRvbmx5KFJldHlwZWQuZG9tLkhUTUxFbGVtZW50IGVsZW1lbnQgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFJlYWRPbmx5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVhZG9ubHlcIikpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyZWFkb25seVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVhZG9ubHlcIikpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG9iamVjdCBfdGFnO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFVzZSBUYWcgYXMgQ2xhc3MgTmFtZVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgb2JqZWN0IFRhZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF90YWc7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF90YWcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmKF90YWcgaXMgc3RyaW5nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnQuY2xhc3NOYW1lID0gKF90YWcgKyBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50LmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBBcHBseURpc2FibGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBDb250cm9sQ29sbGVjdGlvbiBDb250cm9scyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwcml2YXRlIEZvbnQgX2ZvbnQ7XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgRm9udCBGb250IHsgZ2V0IHsgcmV0dXJuIF9mb250OyB9IHNldCB7XHJcbiAgICAgICAgICAgICAgICBfZm9udCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYoX2ZvbnQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCJpbmhlcml0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gXCJpbmhlcml0XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IF9mb250LkVtU2l6ZS5Ub1N0cmluZygpICsgXCJwdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnQuc3R5bGUuZm9udEZhbWlseSA9IF9mb250LkZhbWlseU5hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IH1cclxuICAgICAgICBwcml2YXRlIGJvb2wgX2F1dG9TaXplO1xyXG4gICAgICAgIHByb3RlY3RlZCBib29sIF9pbml0O1xyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgQXV0b1NpemUgeyBnZXQgeyByZXR1cm4gX2F1dG9TaXplOyB9IHNldCB7XHJcbiAgICAgICAgICAgICAgICBpZihfaW5pdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfYXV0b1NpemUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU2l6ZSA9IF9zaXplO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFJldHlwZWQuZG9tLkhUTUxFbGVtZW50IEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBDb250cm9sKFJldHlwZWQuZG9tLkhUTUxFbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBFbGVtZW50ID0gZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIENvbnRyb2xzID0gbmV3IENvbnRyb2xDb2xsZWN0aW9uKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgRWxlbWVudC5zdHlsZS5ib3hTaXppbmcgPSBcImJvcmRlcmJveFwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgIEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcImluaGVyaXRcIjtcclxuICAgICAgICAgICAgRWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gXCJpbmhlcml0XCI7XHJcblxyXG4gICAgICAgICAgICBWaXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIFRhYlN0b3AgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgRWxlbWVudC5vbmNsaWNrID0gbmV3IFJldHlwZWQuZG9tLkhUTUxFbGVtZW50Lm9uY2xpY2tGbigoZXYpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgT25DbGljayhFdmVudEFyZ3MuRW1wdHkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgX2luaXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBPbkNsaWNrKEV2ZW50QXJncyBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKENsaWNrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBDbGljayh0aGlzLCBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWRkaW5nIE1hcmdpbiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIFBhZGRpbmcgUGFkZGluZyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBldmVudCBFdmVudEhhbmRsZXIgQ2xpY2s7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFN1c3BlbmRMYXlvdXQoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc3VtZUxheW91dChib29sIHBlcmZvcm1MYXlvdXQpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgUGVyZm9ybUxheW91dCgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5EYXRhXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBEYXRhQ29sdW1uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBEYXRhVGFibGUgVGFibGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIERhdGFDb2x1bW4oRGF0YVRhYmxlIHRhYmxlLCBzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBUYWJsZSA9IHRhYmxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLkRhdGFcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERhdGFDb2x1bW5Db2xsZWN0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIERhdGFUYWJsZSBUYWJsZSB7Z2V0O3ByaXZhdGUgc2V0O31cclxuICAgICAgICBpbnRlcm5hbCBMaXN0PERhdGFDb2x1bW4+IENvbHVtbnM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgR2V0Q29sdW1uSW5kZXgoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IENvbHVtbnMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKENvbHVtbnNbaV0uTmFtZSA9PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IENvdW50IHtnZXR7cmV0dXJuIENvbHVtbnMuQ291bnQ7fX1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgRGF0YUNvbHVtbkNvbGxlY3Rpb24oRGF0YVRhYmxlIHRhYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFibGUgPSB0YWJsZTtcclxuICAgICAgICAgICAgQ29sdW1ucyA9IG5ldyBMaXN0PERhdGFDb2x1bW4+KCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERhdGFDb2x1bW4gQWRkKHN0cmluZyBjb2x1bW5OYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXcgRGF0YUNvbHVtbihUYWJsZSwgY29sdW1uTmFtZSk7XHJcblxyXG4gICAgICAgICAgICBDb2x1bW5zLkFkZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uRGF0YVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRGF0YVJvd1xyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIFJldHlwZWQuZG9tLkhUTUxUYWJsZVJvd0VsZW1lbnQgRWxlbWVudDsgICAgICAgIFxyXG4gICAgICAgIGludGVybmFsIExpc3Q8b2JqZWN0PiBkYXRhO1xyXG4gICAgICAgIHB1YmxpYyBEYXRhQ29sdW1uQ29sbGVjdGlvbiBDb2x1bW5zIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIGludGVybmFsIERhdGFSb3coRGF0YUNvbHVtbkNvbGxlY3Rpb24gY29sdW1ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbHVtbnMgPSBjb2x1bW5zO1xyXG4gICAgICAgICAgICBkYXRhID0gbmV3IExpc3Q8b2JqZWN0PihDb2x1bW5zLkNvdW50KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgRWxlbWVudCA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MVGFibGVSb3dFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgbmV3IG9iamVjdCB0aGlzW3N0cmluZyBjb2x1bW5OYW1lXSB7IGdldCB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tDb2x1bW5zLkdldENvbHVtbkluZGV4KGNvbHVtbk5hbWUpXTtcclxuICAgICAgICAgICAgfSBzZXQge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tDb2x1bW5zLkdldENvbHVtbkluZGV4KGNvbHVtbk5hbWUpXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9IH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgb2JqZWN0IHRoaXNbaW50IGNvbHVtbkluZGV4XSB7IGdldCB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kZXggPCAwIHx8IGNvbHVtbkluZGV4ID4gQ29sdW1ucy5Db3VudCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbY29sdW1uSW5kZXhdO1xyXG4gICAgICAgICAgICB9IHNldCB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kZXggPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5JbmRleCA+IENvbHVtbnMuQ291bnQgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uSW5kZXggPiBkYXRhLkNvdW50IC0gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gZGF0YS5Db3VudDsgaSA8IGNvbHVtbkluZGV4ICsgMTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRjID0gbmV3IFJldHlwZWQuZG9tLkhUTUxUYWJsZURhdGFDZWxsRWxlbWVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gY29sdW1uSW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuQWRkKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRjLmlubmVyVGV4dCA9ICh2YWx1ZSArIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbGVtZW50LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50PihkYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVsZW1lbnQuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQ+KGRjKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkFkZChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50LmNoaWxkcmVuW2NvbHVtbkluZGV4XS5BczxSZXR5cGVkLmRvbS5IVE1MRWxlbWVudD4oKS5pbm5lclRleHQgPSAodmFsdWUgKyBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhW2NvbHVtbkluZGV4XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSB9ICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uRGF0YVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRGF0YVJvd0NvbGxlY3Rpb25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRGF0YVRhYmxlIFRhYmxlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIGludGVybmFsIExpc3Q8RGF0YVJvdz4gcm93cztcclxuXHJcbiAgICAgICAgaW50ZXJuYWwgRGF0YVJvd0NvbGxlY3Rpb24oRGF0YVRhYmxlIHRhYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFibGUgPSB0YWJsZTtcclxuICAgICAgICAgICAgcm93cyA9IG5ldyBMaXN0PERhdGFSb3c+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoRGF0YVJvdyBkcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvd3MuQWRkKGRyKTtcclxuICAgICAgICAgICAgVGFibGUuT25OZXdSb3coVGFibGUsIG5ldyBXaW5kb3dzLkZvcm1zLk5ld1Jvd0V2ZW50QXJncygpIHsgUm93ID0gZHIgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgU3lzdGVtLldpbmRvd3MuRm9ybXM7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLkRhdGFcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERhdGFUYWJsZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBEYXRhQ29sdW1uQ29sbGVjdGlvbiBDb2x1bW5zIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBEYXRhUm93Q29sbGVjdGlvbiBSb3dzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRGF0YVRhYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbHVtbnMgPSBuZXcgRGF0YUNvbHVtbkNvbGxlY3Rpb24odGhpcyk7XHJcbiAgICAgICAgICAgIFJvd3MgPSBuZXcgRGF0YVJvd0NvbGxlY3Rpb24odGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBEYXRhUm93IE5ld1JvdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZHIgPSBuZXcgRGF0YVJvdyhDb2x1bW5zKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFjY2VwdENoYW5nZXMoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZXZlbnQgTmV3Um93RXZlbnRIYW5kbGVyIE5ld1Jvd0V2ZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE9uTmV3Um93KG9iamVjdCBzZW5kZXIsIE5ld1Jvd0V2ZW50QXJncyBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoTmV3Um93RXZlbnQgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmV3Um93RXZlbnQoc2VuZGVyLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uRHJhd2luZ1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IENvbG9yXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDb2xvciBFbXB0eTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzaG9ydCBTdGF0ZUtub3duQ29sb3JWYWxpZDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzaG9ydCBTdGF0ZUFSR0JWYWx1ZVZhbGlkO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHNob3J0IFN0YXRlVmFsdWVNYXNrO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHNob3J0IFN0YXRlTmFtZVZhbGlkO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGxvbmcgTm90RGVmaW5lZFZhbHVlO1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IEFSR0JBbHBoYVNoaWZ0ID0gMHgxODtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGludCBBUkdCUmVkU2hpZnQgPSAweDEwO1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IEFSR0JHcmVlblNoaWZ0ID0gODtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGludCBBUkdCQmx1ZVNoaWZ0ID0gMDtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHN0cmluZyBuYW1lO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbG9uZyB2YWx1ZTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHNob3J0IGtub3duQ29sb3I7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBzaG9ydCBzdGF0ZTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBUcmFuc3BhcmVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5UcmFuc3BhcmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQWxpY2VCbHVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkFsaWNlQmx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQW50aXF1ZVdoaXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkFudGlxdWVXaGl0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQXF1YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5BcXVhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBBcXVhbWFyaW5lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkFxdWFtYXJpbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEF6dXJlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkF6dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBCZWlnZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5CZWlnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQmlzcXVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkJpc3F1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQmxhY2tcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuQmxhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEJsYW5jaGVkQWxtb25kXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkJsYW5jaGVkQWxtb25kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBCbHVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkJsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEJsdWVWaW9sZXRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuQmx1ZVZpb2xldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQnJvd25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuQnJvd24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEJ1cmx5V29vZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5CdXJseVdvb2QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIENhZGV0Qmx1ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5DYWRldEJsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIENoYXJ0cmV1c2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuQ2hhcnRyZXVzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQ2hvY29sYXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkNob2NvbGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQ29yYWxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuQ29yYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIENvcm5mbG93ZXJCbHVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkNvcm5mbG93ZXJCbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBDb3Juc2lsa1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Db3Juc2lsayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQ3JpbXNvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Dcmltc29uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBDeWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkN5YW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIERhcmtCbHVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkRhcmtCbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBEYXJrQ3lhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5EYXJrQ3lhbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgRGFya0dvbGRlbnJvZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5EYXJrR29sZGVucm9kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBEYXJrR3JheVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5EYXJrR3JheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgRGFya0dyZWVuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkRhcmtHcmVlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgRGFya0toYWtpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkRhcmtLaGFraSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgRGFya01hZ2VudGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuRGFya01hZ2VudGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIERhcmtPbGl2ZUdyZWVuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkRhcmtPbGl2ZUdyZWVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBEYXJrT3JhbmdlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkRhcmtPcmFuZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIERhcmtPcmNoaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuRGFya09yY2hpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgRGFya1JlZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5EYXJrUmVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBEYXJrU2FsbW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkRhcmtTYWxtb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIERhcmtTZWFHcmVlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5EYXJrU2VhR3JlZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIERhcmtTbGF0ZUJsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuRGFya1NsYXRlQmx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgRGFya1NsYXRlR3JheVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5EYXJrU2xhdGVHcmF5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBEYXJrVHVycXVvaXNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkRhcmtUdXJxdW9pc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIERhcmtWaW9sZXRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuRGFya1Zpb2xldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgRGVlcFBpbmtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuRGVlcFBpbmspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIERlZXBTa3lCbHVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkRlZXBTa3lCbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBEaW1HcmF5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkRpbUdyYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIERvZGdlckJsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuRG9kZ2VyQmx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgRmlyZWJyaWNrXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkZpcmVicmljayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgRmxvcmFsV2hpdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuRmxvcmFsV2hpdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEZvcmVzdEdyZWVuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkZvcmVzdEdyZWVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBGdWNoc2lhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkZ1Y2hzaWEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEdhaW5zYm9yb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5HYWluc2Jvcm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEdob3N0V2hpdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuR2hvc3RXaGl0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgR29sZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Hb2xkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBHb2xkZW5yb2RcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuR29sZGVucm9kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBHcmF5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkdyYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEdyZWVuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkdyZWVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBHcmVlblllbGxvd1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5HcmVlblllbGxvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgSG9uZXlkZXdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuSG9uZXlkZXcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEhvdFBpbmtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuSG90UGluayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgSW5kaWFuUmVkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkluZGlhblJlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgSW5kaWdvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkluZGlnbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgSXZvcnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuSXZvcnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEtoYWtpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLktoYWtpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBMYXZlbmRlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5MYXZlbmRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTGF2ZW5kZXJCbHVzaFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5MYXZlbmRlckJsdXNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBMYXduR3JlZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTGF3bkdyZWVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBMZW1vbkNoaWZmb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTGVtb25DaGlmZm9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBMaWdodEJsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTGlnaHRCbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBMaWdodENvcmFsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkxpZ2h0Q29yYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIExpZ2h0Q3lhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5MaWdodEN5YW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIExpZ2h0R29sZGVucm9kWWVsbG93XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkxpZ2h0R29sZGVucm9kWWVsbG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBMaWdodEdyZWVuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkxpZ2h0R3JlZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIExpZ2h0R3JheVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5MaWdodEdyYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIExpZ2h0UGlua1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5MaWdodFBpbmspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIExpZ2h0U2FsbW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkxpZ2h0U2FsbW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBMaWdodFNlYUdyZWVuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkxpZ2h0U2VhR3JlZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIExpZ2h0U2t5Qmx1ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5MaWdodFNreUJsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIExpZ2h0U2xhdGVHcmF5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkxpZ2h0U2xhdGVHcmF5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBMaWdodFN0ZWVsQmx1ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5MaWdodFN0ZWVsQmx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTGlnaHRZZWxsb3dcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTGlnaHRZZWxsb3cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIExpbWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTGltZUdyZWVuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkxpbWVHcmVlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTGluZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTGluZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE1hZ2VudGFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTWFnZW50YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTWFyb29uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk1hcm9vbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTWVkaXVtQXF1YW1hcmluZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5NZWRpdW1BcXVhbWFyaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBNZWRpdW1CbHVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk1lZGl1bUJsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE1lZGl1bU9yY2hpZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5NZWRpdW1PcmNoaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE1lZGl1bVB1cnBsZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5NZWRpdW1QdXJwbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE1lZGl1bVNlYUdyZWVuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk1lZGl1bVNlYUdyZWVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBNZWRpdW1TbGF0ZUJsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTWVkaXVtU2xhdGVCbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBNZWRpdW1TcHJpbmdHcmVlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5NZWRpdW1TcHJpbmdHcmVlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTWVkaXVtVHVycXVvaXNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk1lZGl1bVR1cnF1b2lzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTWVkaXVtVmlvbGV0UmVkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk1lZGl1bVZpb2xldFJlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTWlkbmlnaHRCbHVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk1pZG5pZ2h0Qmx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTWludENyZWFtXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk1pbnRDcmVhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTWlzdHlSb3NlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk1pc3R5Um9zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTW9jY2FzaW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTW9jY2FzaW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE5hdmFqb1doaXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk5hdmFqb1doaXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBOYXZ5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk5hdnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE9sZExhY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuT2xkTGFjZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgT2xpdmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuT2xpdmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE9saXZlRHJhYlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5PbGl2ZURyYWIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE9yYW5nZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5PcmFuZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE9yYW5nZVJlZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5PcmFuZ2VSZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE9yY2hpZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5PcmNoaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFBhbGVHb2xkZW5yb2RcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuUGFsZUdvbGRlbnJvZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgUGFsZUdyZWVuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlBhbGVHcmVlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgUGFsZVR1cnF1b2lzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5QYWxlVHVycXVvaXNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBQYWxlVmlvbGV0UmVkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlBhbGVWaW9sZXRSZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFBhcGF5YVdoaXBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuUGFwYXlhV2hpcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgUGVhY2hQdWZmXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlBlYWNoUHVmZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgUGVydVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5QZXJ1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBQaW5rXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlBpbmspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFBsdW1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuUGx1bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgUG93ZGVyQmx1ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Qb3dkZXJCbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBQdXJwbGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuUHVycGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBSZWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuUmVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBSb3N5QnJvd25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuUm9zeUJyb3duKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBSb3lhbEJsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuUm95YWxCbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBTYWRkbGVCcm93blxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5TYWRkbGVCcm93bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgU2FsbW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlNhbG1vbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgU2FuZHlCcm93blxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5TYW5keUJyb3duKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBTZWFHcmVlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5TZWFHcmVlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgU2VhU2hlbGxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuU2VhU2hlbGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFNpZW5uYVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5TaWVubmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFNpbHZlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5TaWx2ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFNreUJsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuU2t5Qmx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgU2xhdGVCbHVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlNsYXRlQmx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgU2xhdGVHcmF5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlNsYXRlR3JheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgU25vd1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Tbm93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBTcHJpbmdHcmVlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5TcHJpbmdHcmVlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgU3RlZWxCbHVlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlN0ZWVsQmx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgVGFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlRhbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgVGVhbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5UZWFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBUaGlzdGxlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlRoaXN0bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFRvbWF0b1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Ub21hdG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFR1cnF1b2lzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5UdXJxdW9pc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFZpb2xldFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5WaW9sZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFdoZWF0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLldoZWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBXaGl0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5XaGl0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgV2hpdGVTbW9rZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5XaGl0ZVNtb2tlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBZZWxsb3dcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuWWVsbG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBZZWxsb3dHcmVlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5ZZWxsb3dHcmVlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIENvbG9yKEtub3duQ29sb3Iga25vd25Db2xvcilcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSAwTDtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlS25vd25Db2xvclZhbGlkO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmtub3duQ29sb3IgPSAoc2hvcnQpa25vd25Db2xvcjsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQ29sb3IobG9uZyB2YWx1ZSwgc2hvcnQgc3RhdGUsIHN0cmluZyBuYW1lLCBLbm93bkNvbG9yIGtub3duQ29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgdGhpcy5rbm93bkNvbG9yID0gKHNob3J0KWtub3duQ29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYnl0ZSBSXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChieXRlKSgodGhpcy5WYWx1ZSA+PiAweDEwKSAmIDB4ZmZMKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJ5dGUgR1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYnl0ZSkoKHRoaXMuVmFsdWUgPj4gOCkgJiAweGZmTCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBieXRlIEJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGJ5dGUpKHRoaXMuVmFsdWUgJiAweGZmTCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBieXRlIEFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGJ5dGUpKCh0aGlzLlZhbHVlID4+IDB4MTgpICYgMHhmZkwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0tub3duQ29sb3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnN0YXRlICYgU3RhdGVLbm93bkNvbG9yVmFsaWQpID4gMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRW1wdHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc3RhdGUgPT0gMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzTmFtZWRDb2xvclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICgodGhpcy5zdGF0ZSAmIFN0YXRlTmFtZVZhbGlkKSA9PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLklzS25vd25Db2xvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc1N5c3RlbUNvbG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzS25vd25Db2xvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5rbm93bkNvbG9yID4gMHgxYSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMua25vd25Db2xvciA+IDB4YTcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW1wbGljaXQgb3BlcmF0b3Igc3RyaW5nKENvbG9yIGNvbG9yKSAgLy8gaW1wbGljaXQgZGlnaXQgdG8gYnl0ZSBjb252ZXJzaW9uIG9wZXJhdG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gY29sb3IuVG9IdG1sKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGltcGxpY2l0IG9wZXJhdG9yIENvbG9yKHN0cmluZyBoZXhWYWx1ZSkgIC8vIGltcGxpY2l0IGRpZ2l0IHRvIGJ5dGUgY29udmVyc2lvbiBvcGVyYXRvclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENvbG9yLkZyb21IZXgoaGV4VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgTmFtZUFuZEFSR0JWYWx1ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwie3tOYW1lPXswfSwgQVJHQj0oezF9LCB7Mn0sIHszfSwgezR9KX19XCIsIHRoaXMuTmFtZSwgdGhpcy5BLCB0aGlzLlIsIHRoaXMuRywgdGhpcy5CKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLnN0YXRlICYgU3RhdGVOYW1lVmFsaWQpICE9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0tub3duQ29sb3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbnZlcnQuVG9TdHJpbmcodGhpcy52YWx1ZSwgMHgxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgc3RyID0gS25vd25Db2xvclRhYmxlLktub3duQ29sb3JUb05hbWUoKEtub3duQ29sb3IpdGhpcy5rbm93bkNvbG9yKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdHIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMua25vd25Db2xvci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxvbmcgVmFsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuc3RhdGUgJiBTdGF0ZVZhbHVlTWFzaykgIT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLklzS25vd25Db2xvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGxvbmcpS25vd25Db2xvclRhYmxlLktub3duQ29sb3JUb0FyZ2IoKEtub3duQ29sb3IpdGhpcy5rbm93bkNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBOb3REZWZpbmVkVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgQ2hlY2tCeXRlKGludCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICgodmFsdWUgPCAwKSB8fCAodmFsdWUgPiAweGZmKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKFwiSW52YWxpZEV4MkJvdW5kQXJndW1lbnRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGxvbmcgTWFrZUFyZ2IoYnl0ZSBhbHBoYSwgYnl0ZSByZWQsIGJ5dGUgZ3JlZW4sIGJ5dGUgYmx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoYWxwaGEgPDwgMjQpIHwgKHJlZCA8PCAxNikgfCAoZ3JlZW4gPDwgOCkgfCBibHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBGcm9tQXJnYihpbnQgYXJnYilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoYXJnYiAmICgobG9uZykweGZmZmZmZmZmTCksIFN0YXRlQVJHQlZhbHVlVmFsaWQsIG51bGwsIChLbm93bkNvbG9yKTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBGcm9tQXJnYihpbnQgYWxwaGEsIGludCByZWQsIGludCBncmVlbiwgaW50IGJsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDaGVja0J5dGUoYWxwaGEpO1xyXG4gICAgICAgICAgICBDaGVja0J5dGUocmVkKTtcclxuICAgICAgICAgICAgQ2hlY2tCeXRlKGdyZWVuKTtcclxuICAgICAgICAgICAgQ2hlY2tCeXRlKGJsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbG9yKE1ha2VBcmdiKChieXRlKWFscGhhLCAoYnl0ZSlyZWQsIChieXRlKWdyZWVuLCAoYnl0ZSlibHVlKSwgU3RhdGVBUkdCVmFsdWVWYWxpZCwgbnVsbCwgKEtub3duQ29sb3IpMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEZyb21BcmdiKGludCBhbHBoYSwgQ29sb3IgYmFzZUNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hlY2tCeXRlKGFscGhhKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihNYWtlQXJnYigoYnl0ZSlhbHBoYSwgYmFzZUNvbG9yLlIsIGJhc2VDb2xvci5HLCBiYXNlQ29sb3IuQiksIFN0YXRlQVJHQlZhbHVlVmFsaWQsIG51bGwsIChLbm93bkNvbG9yKTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBGcm9tQXJnYihpbnQgcmVkLCBpbnQgZ3JlZW4sIGludCBibHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEZyb21BcmdiKDB4ZmYsIHJlZCwgZ3JlZW4sIGJsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIElzRW51bVZhbGlkKEVudW0gZW51bVZhbHVlLCBpbnQgdmFsdWUsIGludCBtaW5WYWx1ZSwgaW50IG1heFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgodmFsdWUgPj0gbWluVmFsdWUpICYmICh2YWx1ZSA8PSBtYXhWYWx1ZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBGcm9tS25vd25Db2xvcihLbm93bkNvbG9yIGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihjb2xvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIGNvbXBvbmVudFRvSGV4KGJ5dGUgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgeCA9IHZhbHVlLlRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgcmV0dXJuICh4Lkxlbmd0aCA9PSAxID8gXCIwXCIgOiBcIlwiKSArIHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFRvSHRtbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihJc0tub3duQ29sb3IpXHJcbiAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29sb3IuRnJvbUFyZ2IoS25vd25Db2xvclRhYmxlLktub3duQ29sb3JUb0FyZ2IoKEtub3duQ29sb3Ipa25vd25Db2xvcikpLlRvSHRtbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKEEgIT0gMjU1KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiI3swfXsxfXsyfXszfVwiLCBjb21wb25lbnRUb0hleChBKSwgY29tcG9uZW50VG9IZXgoUiksIGNvbXBvbmVudFRvSGV4KEcpLCBjb21wb25lbnRUb0hleChCKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCIjezB9ezF9ezJ9XCIsIGNvbXBvbmVudFRvSGV4KFIpLCBjb21wb25lbnRUb0hleChHKSwgY29tcG9uZW50VG9IZXgoQikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEZyb21IZXgoc3RyaW5nIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLlN0YXJ0c1dpdGgoXCIjXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZyb21IZXgodmFsdWUuU3Vic3RyaW5nKDEpKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29sb3IuRnJvbUFyZ2IoU2NyaXB0LlBhcnNlSW50KHZhbHVlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBHZXRCcmlnaHRuZXNzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHogPSBSIC8gcTtcclxuICAgICAgICAgICAgZmxvYXQgeCA9IEcgLyBxO1xyXG4gICAgICAgICAgICBmbG9hdCBjID0gQiAvIHE7XHJcbiAgICAgICAgICAgIGZsb2F0IHYgPSB6O1xyXG4gICAgICAgICAgICBmbG9hdCBiID0gejtcclxuICAgICAgICAgICAgaWYgKHggPiB2KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2ID0geDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYyA+IHYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHYgPSBjO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh4IDwgYilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYiA9IHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGMgPCBiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiID0gYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKCh2ICsgYikgLyAyZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgR2V0SHVlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICgodGhpcy5SID09IHRoaXMuRykgJiYgKHRoaXMuRyA9PSB0aGlzLkIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMGY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmxvYXQgeiA9IFIgLyBxO1xyXG4gICAgICAgICAgICBmbG9hdCB4ID0gRyAvIHE7XHJcbiAgICAgICAgICAgIGZsb2F0IGMgPSBCIC8gcTtcclxuICAgICAgICAgICAgZmxvYXQgdiA9IDBmO1xyXG4gICAgICAgICAgICBmbG9hdCBiID0gejtcclxuICAgICAgICAgICAgZmxvYXQgbiA9IHo7XHJcbiAgICAgICAgICAgIGlmICh4ID4gYilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYiA9IHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGMgPiBiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiID0gYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoeCA8IG4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG4gPSB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjIDwgbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbiA9IGM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmxvYXQgbnVtNiA9IGIgLSBuO1xyXG4gICAgICAgICAgICBpZiAoeiA9PSBiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2ID0gKHggLSBjKSAvIG51bTY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoeCA9PSBiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2ID0gMmYgKyAoKGMgLSB6KSAvIG51bTYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGMgPT0gYilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdiA9IDRmICsgKCh6IC0geCkgLyBudW02KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2ICo9IDYwZjtcclxuICAgICAgICAgICAgaWYgKHYgPCAwZilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdiArPSAzNjBmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZmxvYXQgcSA9IDI1NWY7XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBHZXRTYXR1cmF0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHogPSBSIC8gcTtcclxuICAgICAgICAgICAgZmxvYXQgeCA9IEcgLyBxO1xyXG4gICAgICAgICAgICBmbG9hdCBjID0gQiAvIHE7XHJcbiAgICAgICAgICAgIGZsb2F0IHYgPSAwZjtcclxuICAgICAgICAgICAgZmxvYXQgYiA9IHo7XHJcbiAgICAgICAgICAgIGZsb2F0IG4gPSB6O1xyXG4gICAgICAgICAgICBpZiAoeCA+IGIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGIgPSB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjID4gYilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYiA9IGM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHggPCBuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuID0geDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYyA8IG4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG4gPSBjO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiID09IG4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZsb2F0IG0gPSAoYiArIG4pIC8gMmY7XHJcbiAgICAgICAgICAgIGlmIChtIDw9IDAuNSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICgoYiAtIG4pIC8gKGIgKyBuKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICgoYiAtIG4pIC8gKCgyZiAtIGIpIC0gbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBUb0FyZ2IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpbnQpdGhpcy5WYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBLbm93bkNvbG9yIFRvS25vd25Db2xvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKEtub3duQ29sb3IpdGhpcy5rbm93bkNvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTdHJpbmdCdWlsZGVyIGJ1aWxkZXIgPSBuZXcgU3RyaW5nQnVpbGRlcigweDIwKTtcclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmQoYmFzZS5HZXRUeXBlKCkuTmFtZSk7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kKFwiIFtcIik7XHJcbiAgICAgICAgICAgIGlmICgodGhpcy5zdGF0ZSAmIFN0YXRlTmFtZVZhbGlkKSAhPSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBidWlsZGVyLkFwcGVuZCh0aGlzLk5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCh0aGlzLnN0YXRlICYgU3RhdGVLbm93bkNvbG9yVmFsaWQpICE9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kKHRoaXMuTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoKHRoaXMuc3RhdGUgJiBTdGF0ZVZhbHVlTWFzaykgIT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnVpbGRlci5BcHBlbmRGb3JtYXQoXCJBPXswfSwgUj17MX0sIEc9ezJ9LCBCPXszfVwiLCBBLCBSLCBHLCBCKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJ1aWxkZXIuQXBwZW5kKFwiRW1wdHlcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVpbGRlci5BcHBlbmQoXCJdXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KENvbG9yIGxlZnQsIENvbG9yIHJpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCgobGVmdC52YWx1ZSAhPSByaWdodC52YWx1ZSkgfHwgKGxlZnQuc3RhdGUgIT0gcmlnaHQuc3RhdGUpKSB8fCAobGVmdC5rbm93bkNvbG9yICE9IHJpZ2h0Lmtub3duQ29sb3IpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICgobGVmdC5uYW1lID09IHJpZ2h0Lm5hbWUpIHx8ICgoKGxlZnQubmFtZSAhPSBudWxsKSAmJiAocmlnaHQubmFtZSAhPSBudWxsKSkgJiYgbGVmdC5uYW1lLkVxdWFscyhyaWdodC5uYW1lKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KENvbG9yIGxlZnQsIENvbG9yIHJpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICEobGVmdCA9PSByaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChvYmogaXMgQ29sb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbG9yIGNvbG9yID0gKENvbG9yKW9iajtcclxuICAgICAgICAgICAgICAgIGlmICgoKHRoaXMudmFsdWUgPT0gY29sb3IudmFsdWUpICYmICh0aGlzLnN0YXRlID09IGNvbG9yLnN0YXRlKSkgJiYgKHRoaXMua25vd25Db2xvciA9PSBjb2xvci5rbm93bkNvbG9yKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLm5hbWUgPT0gY29sb3IubmFtZSkgfHwgKCgodGhpcy5uYW1lICE9IG51bGwpICYmIChjb2xvci5uYW1lICE9IG51bGwpKSAmJiB0aGlzLm5hbWUuRXF1YWxzKHRoaXMubmFtZSkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKHRoaXMudmFsdWUuR2V0SGFzaENvZGUoKSBeIHRoaXMuc3RhdGUuR2V0SGFzaENvZGUoKSkgXiB0aGlzLmtub3duQ29sb3IuR2V0SGFzaENvZGUoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgQ29sb3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRW1wdHkgPSBuZXcgQ29sb3IoKTtcclxuICAgICAgICAgICAgU3RhdGVLbm93bkNvbG9yVmFsaWQgPSAxO1xyXG4gICAgICAgICAgICBTdGF0ZUFSR0JWYWx1ZVZhbGlkID0gMjtcclxuICAgICAgICAgICAgU3RhdGVWYWx1ZU1hc2sgPSBTdGF0ZUFSR0JWYWx1ZVZhbGlkO1xyXG4gICAgICAgICAgICBTdGF0ZU5hbWVWYWxpZCA9IDg7XHJcbiAgICAgICAgICAgIE5vdERlZmluZWRWYWx1ZSA9IDBMO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW51bSBLbm93bkNvbG9yXHJcbiAgICB7XHJcbiAgICAgICAgQWN0aXZlQm9yZGVyID0gMSxcclxuICAgICAgICBBY3RpdmVDYXB0aW9uID0gMixcclxuICAgICAgICBBY3RpdmVDYXB0aW9uVGV4dCA9IDMsXHJcbiAgICAgICAgQWxpY2VCbHVlID0gMHgxYyxcclxuICAgICAgICBBbnRpcXVlV2hpdGUgPSAweDFkLFxyXG4gICAgICAgIEFwcFdvcmtzcGFjZSA9IDQsXHJcbiAgICAgICAgQXF1YSA9IDMwLFxyXG4gICAgICAgIEFxdWFtYXJpbmUgPSAweDFmLFxyXG4gICAgICAgIEF6dXJlID0gMHgyMCxcclxuICAgICAgICBCZWlnZSA9IDB4MjEsXHJcbiAgICAgICAgQmlzcXVlID0gMHgyMixcclxuICAgICAgICBCbGFjayA9IDB4MjMsXHJcbiAgICAgICAgQmxhbmNoZWRBbG1vbmQgPSAweDI0LFxyXG4gICAgICAgIEJsdWUgPSAweDI1LFxyXG4gICAgICAgIEJsdWVWaW9sZXQgPSAweDI2LFxyXG4gICAgICAgIEJyb3duID0gMHgyNyxcclxuICAgICAgICBCdXJseVdvb2QgPSA0MCxcclxuICAgICAgICBCdXR0b25GYWNlID0gMHhhOCxcclxuICAgICAgICBCdXR0b25IaWdobGlnaHQgPSAweGE5LFxyXG4gICAgICAgIEJ1dHRvblNoYWRvdyA9IDE3MCxcclxuICAgICAgICBDYWRldEJsdWUgPSAweDI5LFxyXG4gICAgICAgIENoYXJ0cmV1c2UgPSAweDJhLFxyXG4gICAgICAgIENob2NvbGF0ZSA9IDB4MmIsXHJcbiAgICAgICAgQ29udHJvbCA9IDUsXHJcbiAgICAgICAgQ29udHJvbERhcmsgPSA2LFxyXG4gICAgICAgIENvbnRyb2xEYXJrRGFyayA9IDcsXHJcbiAgICAgICAgQ29udHJvbExpZ2h0ID0gOCxcclxuICAgICAgICBDb250cm9sTGlnaHRMaWdodCA9IDksXHJcbiAgICAgICAgQ29udHJvbFRleHQgPSAxMCxcclxuICAgICAgICBDb3JhbCA9IDB4MmMsXHJcbiAgICAgICAgQ29ybmZsb3dlckJsdWUgPSAweDJkLFxyXG4gICAgICAgIENvcm5zaWxrID0gMHgyZSxcclxuICAgICAgICBDcmltc29uID0gMHgyZixcclxuICAgICAgICBDeWFuID0gMHgzMCxcclxuICAgICAgICBEYXJrQmx1ZSA9IDB4MzEsXHJcbiAgICAgICAgRGFya0N5YW4gPSA1MCxcclxuICAgICAgICBEYXJrR29sZGVucm9kID0gMHgzMyxcclxuICAgICAgICBEYXJrR3JheSA9IDB4MzQsXHJcbiAgICAgICAgRGFya0dyZWVuID0gMHgzNSxcclxuICAgICAgICBEYXJrS2hha2kgPSAweDM2LFxyXG4gICAgICAgIERhcmtNYWdlbnRhID0gMHgzNyxcclxuICAgICAgICBEYXJrT2xpdmVHcmVlbiA9IDB4MzgsXHJcbiAgICAgICAgRGFya09yYW5nZSA9IDB4MzksXHJcbiAgICAgICAgRGFya09yY2hpZCA9IDB4M2EsXHJcbiAgICAgICAgRGFya1JlZCA9IDB4M2IsXHJcbiAgICAgICAgRGFya1NhbG1vbiA9IDYwLFxyXG4gICAgICAgIERhcmtTZWFHcmVlbiA9IDB4M2QsXHJcbiAgICAgICAgRGFya1NsYXRlQmx1ZSA9IDB4M2UsXHJcbiAgICAgICAgRGFya1NsYXRlR3JheSA9IDB4M2YsXHJcbiAgICAgICAgRGFya1R1cnF1b2lzZSA9IDB4NDAsXHJcbiAgICAgICAgRGFya1Zpb2xldCA9IDB4NDEsXHJcbiAgICAgICAgRGVlcFBpbmsgPSAweDQyLFxyXG4gICAgICAgIERlZXBTa3lCbHVlID0gMHg0MyxcclxuICAgICAgICBEZXNrdG9wID0gMTEsXHJcbiAgICAgICAgRGltR3JheSA9IDB4NDQsXHJcbiAgICAgICAgRG9kZ2VyQmx1ZSA9IDB4NDUsXHJcbiAgICAgICAgRmlyZWJyaWNrID0gNzAsXHJcbiAgICAgICAgRmxvcmFsV2hpdGUgPSAweDQ3LFxyXG4gICAgICAgIEZvcmVzdEdyZWVuID0gMHg0OCxcclxuICAgICAgICBGdWNoc2lhID0gMHg0OSxcclxuICAgICAgICBHYWluc2Jvcm8gPSAweDRhLFxyXG4gICAgICAgIEdob3N0V2hpdGUgPSAweDRiLFxyXG4gICAgICAgIEdvbGQgPSAweDRjLFxyXG4gICAgICAgIEdvbGRlbnJvZCA9IDB4NGQsXHJcbiAgICAgICAgR3JhZGllbnRBY3RpdmVDYXB0aW9uID0gMHhhYixcclxuICAgICAgICBHcmFkaWVudEluYWN0aXZlQ2FwdGlvbiA9IDB4YWMsXHJcbiAgICAgICAgR3JheSA9IDB4NGUsXHJcbiAgICAgICAgR3JheVRleHQgPSAxMixcclxuICAgICAgICBHcmVlbiA9IDB4NGYsXHJcbiAgICAgICAgR3JlZW5ZZWxsb3cgPSA4MCxcclxuICAgICAgICBIaWdobGlnaHQgPSAxMyxcclxuICAgICAgICBIaWdobGlnaHRUZXh0ID0gMTQsXHJcbiAgICAgICAgSG9uZXlkZXcgPSAweDUxLFxyXG4gICAgICAgIEhvdFBpbmsgPSAweDUyLFxyXG4gICAgICAgIEhvdFRyYWNrID0gMTUsXHJcbiAgICAgICAgSW5hY3RpdmVCb3JkZXIgPSAweDEwLFxyXG4gICAgICAgIEluYWN0aXZlQ2FwdGlvbiA9IDB4MTEsXHJcbiAgICAgICAgSW5hY3RpdmVDYXB0aW9uVGV4dCA9IDB4MTIsXHJcbiAgICAgICAgSW5kaWFuUmVkID0gMHg1MyxcclxuICAgICAgICBJbmRpZ28gPSAweDU0LFxyXG4gICAgICAgIEluZm8gPSAweDEzLFxyXG4gICAgICAgIEluZm9UZXh0ID0gMjAsXHJcbiAgICAgICAgSXZvcnkgPSAweDU1LFxyXG4gICAgICAgIEtoYWtpID0gMHg1NixcclxuICAgICAgICBMYXZlbmRlciA9IDB4NTcsXHJcbiAgICAgICAgTGF2ZW5kZXJCbHVzaCA9IDB4NTgsXHJcbiAgICAgICAgTGF3bkdyZWVuID0gMHg1OSxcclxuICAgICAgICBMZW1vbkNoaWZmb24gPSA5MCxcclxuICAgICAgICBMaWdodEJsdWUgPSAweDViLFxyXG4gICAgICAgIExpZ2h0Q29yYWwgPSAweDVjLFxyXG4gICAgICAgIExpZ2h0Q3lhbiA9IDB4NWQsXHJcbiAgICAgICAgTGlnaHRHb2xkZW5yb2RZZWxsb3cgPSAweDVlLFxyXG4gICAgICAgIExpZ2h0R3JheSA9IDB4NWYsXHJcbiAgICAgICAgTGlnaHRHcmVlbiA9IDB4NjAsXHJcbiAgICAgICAgTGlnaHRQaW5rID0gMHg2MSxcclxuICAgICAgICBMaWdodFNhbG1vbiA9IDB4NjIsXHJcbiAgICAgICAgTGlnaHRTZWFHcmVlbiA9IDB4NjMsXHJcbiAgICAgICAgTGlnaHRTa3lCbHVlID0gMTAwLFxyXG4gICAgICAgIExpZ2h0U2xhdGVHcmF5ID0gMHg2NSxcclxuICAgICAgICBMaWdodFN0ZWVsQmx1ZSA9IDB4NjYsXHJcbiAgICAgICAgTGlnaHRZZWxsb3cgPSAweDY3LFxyXG4gICAgICAgIExpbWUgPSAweDY4LFxyXG4gICAgICAgIExpbWVHcmVlbiA9IDB4NjksXHJcbiAgICAgICAgTGluZW4gPSAweDZhLFxyXG4gICAgICAgIE1hZ2VudGEgPSAweDZiLFxyXG4gICAgICAgIE1hcm9vbiA9IDB4NmMsXHJcbiAgICAgICAgTWVkaXVtQXF1YW1hcmluZSA9IDB4NmQsXHJcbiAgICAgICAgTWVkaXVtQmx1ZSA9IDExMCxcclxuICAgICAgICBNZWRpdW1PcmNoaWQgPSAweDZmLFxyXG4gICAgICAgIE1lZGl1bVB1cnBsZSA9IDB4NzAsXHJcbiAgICAgICAgTWVkaXVtU2VhR3JlZW4gPSAweDcxLFxyXG4gICAgICAgIE1lZGl1bVNsYXRlQmx1ZSA9IDB4NzIsXHJcbiAgICAgICAgTWVkaXVtU3ByaW5nR3JlZW4gPSAweDczLFxyXG4gICAgICAgIE1lZGl1bVR1cnF1b2lzZSA9IDB4NzQsXHJcbiAgICAgICAgTWVkaXVtVmlvbGV0UmVkID0gMHg3NSxcclxuICAgICAgICBNZW51ID0gMHgxNSxcclxuICAgICAgICBNZW51QmFyID0gMHhhZCxcclxuICAgICAgICBNZW51SGlnaGxpZ2h0ID0gMHhhZSxcclxuICAgICAgICBNZW51VGV4dCA9IDB4MTYsXHJcbiAgICAgICAgTWlkbmlnaHRCbHVlID0gMHg3NixcclxuICAgICAgICBNaW50Q3JlYW0gPSAweDc3LFxyXG4gICAgICAgIE1pc3R5Um9zZSA9IDEyMCxcclxuICAgICAgICBNb2NjYXNpbiA9IDB4NzksXHJcbiAgICAgICAgTmF2YWpvV2hpdGUgPSAweDdhLFxyXG4gICAgICAgIE5hdnkgPSAweDdiLFxyXG4gICAgICAgIE9sZExhY2UgPSAweDdjLFxyXG4gICAgICAgIE9saXZlID0gMHg3ZCxcclxuICAgICAgICBPbGl2ZURyYWIgPSAweDdlLFxyXG4gICAgICAgIE9yYW5nZSA9IDB4N2YsXHJcbiAgICAgICAgT3JhbmdlUmVkID0gMHg4MCxcclxuICAgICAgICBPcmNoaWQgPSAweDgxLFxyXG4gICAgICAgIFBhbGVHb2xkZW5yb2QgPSAxMzAsXHJcbiAgICAgICAgUGFsZUdyZWVuID0gMHg4MyxcclxuICAgICAgICBQYWxlVHVycXVvaXNlID0gMHg4NCxcclxuICAgICAgICBQYWxlVmlvbGV0UmVkID0gMHg4NSxcclxuICAgICAgICBQYXBheWFXaGlwID0gMHg4NixcclxuICAgICAgICBQZWFjaFB1ZmYgPSAweDg3LFxyXG4gICAgICAgIFBlcnUgPSAweDg4LFxyXG4gICAgICAgIFBpbmsgPSAweDg5LFxyXG4gICAgICAgIFBsdW0gPSAweDhhLFxyXG4gICAgICAgIFBvd2RlckJsdWUgPSAweDhiLFxyXG4gICAgICAgIFB1cnBsZSA9IDE0MCxcclxuICAgICAgICBSZWQgPSAweDhkLFxyXG4gICAgICAgIFJvc3lCcm93biA9IDB4OGUsXHJcbiAgICAgICAgUm95YWxCbHVlID0gMHg4ZixcclxuICAgICAgICBTYWRkbGVCcm93biA9IDB4OTAsXHJcbiAgICAgICAgU2FsbW9uID0gMHg5MSxcclxuICAgICAgICBTYW5keUJyb3duID0gMHg5MixcclxuICAgICAgICBTY3JvbGxCYXIgPSAweDE3LFxyXG4gICAgICAgIFNlYUdyZWVuID0gMHg5MyxcclxuICAgICAgICBTZWFTaGVsbCA9IDB4OTQsXHJcbiAgICAgICAgU2llbm5hID0gMHg5NSxcclxuICAgICAgICBTaWx2ZXIgPSAxNTAsXHJcbiAgICAgICAgU2t5Qmx1ZSA9IDB4OTcsXHJcbiAgICAgICAgU2xhdGVCbHVlID0gMHg5OCxcclxuICAgICAgICBTbGF0ZUdyYXkgPSAweDk5LFxyXG4gICAgICAgIFNub3cgPSAweDlhLFxyXG4gICAgICAgIFNwcmluZ0dyZWVuID0gMHg5YixcclxuICAgICAgICBTdGVlbEJsdWUgPSAweDljLFxyXG4gICAgICAgIFRhbiA9IDB4OWQsXHJcbiAgICAgICAgVGVhbCA9IDB4OWUsXHJcbiAgICAgICAgVGhpc3RsZSA9IDB4OWYsXHJcbiAgICAgICAgVG9tYXRvID0gMTYwLFxyXG4gICAgICAgIFRyYW5zcGFyZW50ID0gMHgxYixcclxuICAgICAgICBUdXJxdW9pc2UgPSAweGExLFxyXG4gICAgICAgIFZpb2xldCA9IDB4YTIsXHJcbiAgICAgICAgV2hlYXQgPSAweGEzLFxyXG4gICAgICAgIFdoaXRlID0gMHhhNCxcclxuICAgICAgICBXaGl0ZVNtb2tlID0gMHhhNSxcclxuICAgICAgICBXaW5kb3cgPSAweDE4LFxyXG4gICAgICAgIFdpbmRvd0ZyYW1lID0gMHgxOSxcclxuICAgICAgICBXaW5kb3dUZXh0ID0gMHgxYSxcclxuICAgICAgICBZZWxsb3cgPSAweGE2LFxyXG4gICAgICAgIFllbGxvd0dyZWVuID0gMHhhN1xyXG4gICAgfVxyXG5cclxuICAgIGludGVybmFsIHN0YXRpYyBjbGFzcyBLbm93bkNvbG9yVGFibGVcclxuICAgIHtcclxuICAgICAgICAvLyBGaWVsZHNcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGludCBBbHBoYVNoaWZ0ID0gMHgxODtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBpbnQgQmx1ZVNoaWZ0ID0gMDtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmdbXSBjb2xvck5hbWVUYWJsZTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnRbXSBjb2xvclRhYmxlO1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IEdyZWVuU2hpZnQgPSA4O1xyXG4gICAgICAgIHByaXZhdGUgY29uc3QgaW50IFJlZFNoaWZ0ID0gMHgxMDtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGludCBXaW4zMkJsdWVTaGlmdCA9IDB4MTA7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdCBpbnQgV2luMzJHcmVlblNoaWZ0ID0gODtcclxuICAgICAgICBwcml2YXRlIGNvbnN0IGludCBXaW4zMlJlZFNoaWZ0ID0gMDtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgR2V0Q29sb3JOYW1lKGludCBpbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVuc3VyZUNvbG9yTmFtZVRhYmxlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2xvck5hbWVUYWJsZVtpbmRleF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXRob2RzXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBBcmdiVG9Lbm93bkNvbG9yKGludCB0YXJnZXRBUkdCKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRW5zdXJlQ29sb3JUYWJsZSgpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvbG9yVGFibGUuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBudW0yID0gY29sb3JUYWJsZVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChudW0yID09IHRhcmdldEFSR0IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29sb3IgY29sb3IgPSBDb2xvci5Gcm9tS25vd25Db2xvcigoS25vd25Db2xvcilpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbG9yLklzU3lzdGVtQ29sb3IpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBDb2xvci5Gcm9tQXJnYih0YXJnZXRBUkdCKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBFbmNvZGUoaW50IGFscGhhLCBpbnQgcmVkLCBpbnQgZ3JlZW4sIGludCBibHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKChyZWQgPDwgMHgxMCkgfCAoZ3JlZW4gPDwgOCkpIHwgYmx1ZSkgfCAoYWxwaGEgPDwgMHgxOCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBFbnN1cmVDb2xvck5hbWVUYWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29sb3JOYW1lVGFibGUgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSW5pdENvbG9yTmFtZVRhYmxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgRW5zdXJlQ29sb3JUYWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29sb3JUYWJsZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBJbml0Q29sb3JUYWJsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnQgRnJvbVdpbjMyVmFsdWUoaW50IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVuY29kZSgweGZmLCB2YWx1ZSAmIDB4ZmYsICh2YWx1ZSA+PiA4KSAmIDB4ZmYsICh2YWx1ZSA+PiAweDEwKSAmIDB4ZmYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBJbml0Q29sb3JOYW1lVGFibGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nW10gcyA9IG5ldyBzdHJpbmdbMHhhZl07XHJcbiAgICAgICAgICAgIHNbMV0gPSBcIkFjdGl2ZUJvcmRlclwiO1xyXG4gICAgICAgICAgICBzWzJdID0gXCJBY3RpdmVDYXB0aW9uXCI7XHJcbiAgICAgICAgICAgIHNbM10gPSBcIkFjdGl2ZUNhcHRpb25UZXh0XCI7XHJcbiAgICAgICAgICAgIHNbNF0gPSBcIkFwcFdvcmtzcGFjZVwiO1xyXG4gICAgICAgICAgICBzWzB4YThdID0gXCJCdXR0b25GYWNlXCI7XHJcbiAgICAgICAgICAgIHNbMHhhOV0gPSBcIkJ1dHRvbkhpZ2hsaWdodFwiO1xyXG4gICAgICAgICAgICBzWzE3MF0gPSBcIkJ1dHRvblNoYWRvd1wiO1xyXG4gICAgICAgICAgICBzWzVdID0gXCJDb250cm9sXCI7XHJcbiAgICAgICAgICAgIHNbNl0gPSBcIkNvbnRyb2xEYXJrXCI7XHJcbiAgICAgICAgICAgIHNbN10gPSBcIkNvbnRyb2xEYXJrRGFya1wiO1xyXG4gICAgICAgICAgICBzWzhdID0gXCJDb250cm9sTGlnaHRcIjtcclxuICAgICAgICAgICAgc1s5XSA9IFwiQ29udHJvbExpZ2h0TGlnaHRcIjtcclxuICAgICAgICAgICAgc1sxMF0gPSBcIkNvbnRyb2xUZXh0XCI7XHJcbiAgICAgICAgICAgIHNbMTFdID0gXCJEZXNrdG9wXCI7XHJcbiAgICAgICAgICAgIHNbMHhhYl0gPSBcIkdyYWRpZW50QWN0aXZlQ2FwdGlvblwiO1xyXG4gICAgICAgICAgICBzWzB4YWNdID0gXCJHcmFkaWVudEluYWN0aXZlQ2FwdGlvblwiO1xyXG4gICAgICAgICAgICBzWzEyXSA9IFwiR3JheVRleHRcIjtcclxuICAgICAgICAgICAgc1sxM10gPSBcIkhpZ2hsaWdodFwiO1xyXG4gICAgICAgICAgICBzWzE0XSA9IFwiSGlnaGxpZ2h0VGV4dFwiO1xyXG4gICAgICAgICAgICBzWzE1XSA9IFwiSG90VHJhY2tcIjtcclxuICAgICAgICAgICAgc1sweDEwXSA9IFwiSW5hY3RpdmVCb3JkZXJcIjtcclxuICAgICAgICAgICAgc1sweDExXSA9IFwiSW5hY3RpdmVDYXB0aW9uXCI7XHJcbiAgICAgICAgICAgIHNbMHgxMl0gPSBcIkluYWN0aXZlQ2FwdGlvblRleHRcIjtcclxuICAgICAgICAgICAgc1sweDEzXSA9IFwiSW5mb1wiO1xyXG4gICAgICAgICAgICBzWzIwXSA9IFwiSW5mb1RleHRcIjtcclxuICAgICAgICAgICAgc1sweDE1XSA9IFwiTWVudVwiO1xyXG4gICAgICAgICAgICBzWzB4YWRdID0gXCJNZW51QmFyXCI7XHJcbiAgICAgICAgICAgIHNbMHhhZV0gPSBcIk1lbnVIaWdobGlnaHRcIjtcclxuICAgICAgICAgICAgc1sweDE2XSA9IFwiTWVudVRleHRcIjtcclxuICAgICAgICAgICAgc1sweDE3XSA9IFwiU2Nyb2xsQmFyXCI7XHJcbiAgICAgICAgICAgIHNbMHgxOF0gPSBcIldpbmRvd1wiO1xyXG4gICAgICAgICAgICBzWzB4MTldID0gXCJXaW5kb3dGcmFtZVwiO1xyXG4gICAgICAgICAgICBzWzB4MWFdID0gXCJXaW5kb3dUZXh0XCI7XHJcbiAgICAgICAgICAgIHNbMHgxYl0gPSBcIlRyYW5zcGFyZW50XCI7XHJcbiAgICAgICAgICAgIHNbMHgxY10gPSBcIkFsaWNlQmx1ZVwiO1xyXG4gICAgICAgICAgICBzWzB4MWRdID0gXCJBbnRpcXVlV2hpdGVcIjtcclxuICAgICAgICAgICAgc1szMF0gPSBcIkFxdWFcIjtcclxuICAgICAgICAgICAgc1sweDFmXSA9IFwiQXF1YW1hcmluZVwiO1xyXG4gICAgICAgICAgICBzWzB4MjBdID0gXCJBenVyZVwiO1xyXG4gICAgICAgICAgICBzWzB4MjFdID0gXCJCZWlnZVwiO1xyXG4gICAgICAgICAgICBzWzB4MjJdID0gXCJCaXNxdWVcIjtcclxuICAgICAgICAgICAgc1sweDIzXSA9IFwiQmxhY2tcIjtcclxuICAgICAgICAgICAgc1sweDI0XSA9IFwiQmxhbmNoZWRBbG1vbmRcIjtcclxuICAgICAgICAgICAgc1sweDI1XSA9IFwiQmx1ZVwiO1xyXG4gICAgICAgICAgICBzWzB4MjZdID0gXCJCbHVlVmlvbGV0XCI7XHJcbiAgICAgICAgICAgIHNbMHgyN10gPSBcIkJyb3duXCI7XHJcbiAgICAgICAgICAgIHNbNDBdID0gXCJCdXJseVdvb2RcIjtcclxuICAgICAgICAgICAgc1sweDI5XSA9IFwiQ2FkZXRCbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHgyYV0gPSBcIkNoYXJ0cmV1c2VcIjtcclxuICAgICAgICAgICAgc1sweDJiXSA9IFwiQ2hvY29sYXRlXCI7XHJcbiAgICAgICAgICAgIHNbMHgyY10gPSBcIkNvcmFsXCI7XHJcbiAgICAgICAgICAgIHNbMHgyZF0gPSBcIkNvcm5mbG93ZXJCbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHgyZV0gPSBcIkNvcm5zaWxrXCI7XHJcbiAgICAgICAgICAgIHNbMHgyZl0gPSBcIkNyaW1zb25cIjtcclxuICAgICAgICAgICAgc1sweDMwXSA9IFwiQ3lhblwiO1xyXG4gICAgICAgICAgICBzWzB4MzFdID0gXCJEYXJrQmx1ZVwiO1xyXG4gICAgICAgICAgICBzWzUwXSA9IFwiRGFya0N5YW5cIjtcclxuICAgICAgICAgICAgc1sweDMzXSA9IFwiRGFya0dvbGRlbnJvZFwiO1xyXG4gICAgICAgICAgICBzWzB4MzRdID0gXCJEYXJrR3JheVwiO1xyXG4gICAgICAgICAgICBzWzB4MzVdID0gXCJEYXJrR3JlZW5cIjtcclxuICAgICAgICAgICAgc1sweDM2XSA9IFwiRGFya0toYWtpXCI7XHJcbiAgICAgICAgICAgIHNbMHgzN10gPSBcIkRhcmtNYWdlbnRhXCI7XHJcbiAgICAgICAgICAgIHNbMHgzOF0gPSBcIkRhcmtPbGl2ZUdyZWVuXCI7XHJcbiAgICAgICAgICAgIHNbMHgzOV0gPSBcIkRhcmtPcmFuZ2VcIjtcclxuICAgICAgICAgICAgc1sweDNhXSA9IFwiRGFya09yY2hpZFwiO1xyXG4gICAgICAgICAgICBzWzB4M2JdID0gXCJEYXJrUmVkXCI7XHJcbiAgICAgICAgICAgIHNbNjBdID0gXCJEYXJrU2FsbW9uXCI7XHJcbiAgICAgICAgICAgIHNbMHgzZF0gPSBcIkRhcmtTZWFHcmVlblwiO1xyXG4gICAgICAgICAgICBzWzB4M2VdID0gXCJEYXJrU2xhdGVCbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHgzZl0gPSBcIkRhcmtTbGF0ZUdyYXlcIjtcclxuICAgICAgICAgICAgc1sweDQwXSA9IFwiRGFya1R1cnF1b2lzZVwiO1xyXG4gICAgICAgICAgICBzWzB4NDFdID0gXCJEYXJrVmlvbGV0XCI7XHJcbiAgICAgICAgICAgIHNbMHg0Ml0gPSBcIkRlZXBQaW5rXCI7XHJcbiAgICAgICAgICAgIHNbMHg0M10gPSBcIkRlZXBTa3lCbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHg0NF0gPSBcIkRpbUdyYXlcIjtcclxuICAgICAgICAgICAgc1sweDQ1XSA9IFwiRG9kZ2VyQmx1ZVwiO1xyXG4gICAgICAgICAgICBzWzcwXSA9IFwiRmlyZWJyaWNrXCI7XHJcbiAgICAgICAgICAgIHNbMHg0N10gPSBcIkZsb3JhbFdoaXRlXCI7XHJcbiAgICAgICAgICAgIHNbMHg0OF0gPSBcIkZvcmVzdEdyZWVuXCI7XHJcbiAgICAgICAgICAgIHNbMHg0OV0gPSBcIkZ1Y2hzaWFcIjtcclxuICAgICAgICAgICAgc1sweDRhXSA9IFwiR2FpbnNib3JvXCI7XHJcbiAgICAgICAgICAgIHNbMHg0Yl0gPSBcIkdob3N0V2hpdGVcIjtcclxuICAgICAgICAgICAgc1sweDRjXSA9IFwiR29sZFwiO1xyXG4gICAgICAgICAgICBzWzB4NGRdID0gXCJHb2xkZW5yb2RcIjtcclxuICAgICAgICAgICAgc1sweDRlXSA9IFwiR3JheVwiO1xyXG4gICAgICAgICAgICBzWzB4NGZdID0gXCJHcmVlblwiO1xyXG4gICAgICAgICAgICBzWzgwXSA9IFwiR3JlZW5ZZWxsb3dcIjtcclxuICAgICAgICAgICAgc1sweDUxXSA9IFwiSG9uZXlkZXdcIjtcclxuICAgICAgICAgICAgc1sweDUyXSA9IFwiSG90UGlua1wiO1xyXG4gICAgICAgICAgICBzWzB4NTNdID0gXCJJbmRpYW5SZWRcIjtcclxuICAgICAgICAgICAgc1sweDU0XSA9IFwiSW5kaWdvXCI7XHJcbiAgICAgICAgICAgIHNbMHg1NV0gPSBcIkl2b3J5XCI7XHJcbiAgICAgICAgICAgIHNbMHg1Nl0gPSBcIktoYWtpXCI7XHJcbiAgICAgICAgICAgIHNbMHg1N10gPSBcIkxhdmVuZGVyXCI7XHJcbiAgICAgICAgICAgIHNbMHg1OF0gPSBcIkxhdmVuZGVyQmx1c2hcIjtcclxuICAgICAgICAgICAgc1sweDU5XSA9IFwiTGF3bkdyZWVuXCI7XHJcbiAgICAgICAgICAgIHNbOTBdID0gXCJMZW1vbkNoaWZmb25cIjtcclxuICAgICAgICAgICAgc1sweDViXSA9IFwiTGlnaHRCbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHg1Y10gPSBcIkxpZ2h0Q29yYWxcIjtcclxuICAgICAgICAgICAgc1sweDVkXSA9IFwiTGlnaHRDeWFuXCI7XHJcbiAgICAgICAgICAgIHNbMHg1ZV0gPSBcIkxpZ2h0R29sZGVucm9kWWVsbG93XCI7XHJcbiAgICAgICAgICAgIHNbMHg1Zl0gPSBcIkxpZ2h0R3JheVwiO1xyXG4gICAgICAgICAgICBzWzB4NjBdID0gXCJMaWdodEdyZWVuXCI7XHJcbiAgICAgICAgICAgIHNbMHg2MV0gPSBcIkxpZ2h0UGlua1wiO1xyXG4gICAgICAgICAgICBzWzB4NjJdID0gXCJMaWdodFNhbG1vblwiO1xyXG4gICAgICAgICAgICBzWzB4NjNdID0gXCJMaWdodFNlYUdyZWVuXCI7XHJcbiAgICAgICAgICAgIHNbMTAwXSA9IFwiTGlnaHRTa3lCbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHg2NV0gPSBcIkxpZ2h0U2xhdGVHcmF5XCI7XHJcbiAgICAgICAgICAgIHNbMHg2Nl0gPSBcIkxpZ2h0U3RlZWxCbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHg2N10gPSBcIkxpZ2h0WWVsbG93XCI7XHJcbiAgICAgICAgICAgIHNbMHg2OF0gPSBcIkxpbWVcIjtcclxuICAgICAgICAgICAgc1sweDY5XSA9IFwiTGltZUdyZWVuXCI7XHJcbiAgICAgICAgICAgIHNbMHg2YV0gPSBcIkxpbmVuXCI7XHJcbiAgICAgICAgICAgIHNbMHg2Yl0gPSBcIk1hZ2VudGFcIjtcclxuICAgICAgICAgICAgc1sweDZjXSA9IFwiTWFyb29uXCI7XHJcbiAgICAgICAgICAgIHNbMHg2ZF0gPSBcIk1lZGl1bUFxdWFtYXJpbmVcIjtcclxuICAgICAgICAgICAgc1sxMTBdID0gXCJNZWRpdW1CbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHg2Zl0gPSBcIk1lZGl1bU9yY2hpZFwiO1xyXG4gICAgICAgICAgICBzWzB4NzBdID0gXCJNZWRpdW1QdXJwbGVcIjtcclxuICAgICAgICAgICAgc1sweDcxXSA9IFwiTWVkaXVtU2VhR3JlZW5cIjtcclxuICAgICAgICAgICAgc1sweDcyXSA9IFwiTWVkaXVtU2xhdGVCbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHg3M10gPSBcIk1lZGl1bVNwcmluZ0dyZWVuXCI7XHJcbiAgICAgICAgICAgIHNbMHg3NF0gPSBcIk1lZGl1bVR1cnF1b2lzZVwiO1xyXG4gICAgICAgICAgICBzWzB4NzVdID0gXCJNZWRpdW1WaW9sZXRSZWRcIjtcclxuICAgICAgICAgICAgc1sweDc2XSA9IFwiTWlkbmlnaHRCbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHg3N10gPSBcIk1pbnRDcmVhbVwiO1xyXG4gICAgICAgICAgICBzWzEyMF0gPSBcIk1pc3R5Um9zZVwiO1xyXG4gICAgICAgICAgICBzWzB4NzldID0gXCJNb2NjYXNpblwiO1xyXG4gICAgICAgICAgICBzWzB4N2FdID0gXCJOYXZham9XaGl0ZVwiO1xyXG4gICAgICAgICAgICBzWzB4N2JdID0gXCJOYXZ5XCI7XHJcbiAgICAgICAgICAgIHNbMHg3Y10gPSBcIk9sZExhY2VcIjtcclxuICAgICAgICAgICAgc1sweDdkXSA9IFwiT2xpdmVcIjtcclxuICAgICAgICAgICAgc1sweDdlXSA9IFwiT2xpdmVEcmFiXCI7XHJcbiAgICAgICAgICAgIHNbMHg3Zl0gPSBcIk9yYW5nZVwiO1xyXG4gICAgICAgICAgICBzWzB4ODBdID0gXCJPcmFuZ2VSZWRcIjtcclxuICAgICAgICAgICAgc1sweDgxXSA9IFwiT3JjaGlkXCI7XHJcbiAgICAgICAgICAgIHNbMTMwXSA9IFwiUGFsZUdvbGRlbnJvZFwiO1xyXG4gICAgICAgICAgICBzWzB4ODNdID0gXCJQYWxlR3JlZW5cIjtcclxuICAgICAgICAgICAgc1sweDg0XSA9IFwiUGFsZVR1cnF1b2lzZVwiO1xyXG4gICAgICAgICAgICBzWzB4ODVdID0gXCJQYWxlVmlvbGV0UmVkXCI7XHJcbiAgICAgICAgICAgIHNbMHg4Nl0gPSBcIlBhcGF5YVdoaXBcIjtcclxuICAgICAgICAgICAgc1sweDg3XSA9IFwiUGVhY2hQdWZmXCI7XHJcbiAgICAgICAgICAgIHNbMHg4OF0gPSBcIlBlcnVcIjtcclxuICAgICAgICAgICAgc1sweDg5XSA9IFwiUGlua1wiO1xyXG4gICAgICAgICAgICBzWzB4OGFdID0gXCJQbHVtXCI7XHJcbiAgICAgICAgICAgIHNbMHg4Yl0gPSBcIlBvd2RlckJsdWVcIjtcclxuICAgICAgICAgICAgc1sxNDBdID0gXCJQdXJwbGVcIjtcclxuICAgICAgICAgICAgc1sweDhkXSA9IFwiUmVkXCI7XHJcbiAgICAgICAgICAgIHNbMHg4ZV0gPSBcIlJvc3lCcm93blwiO1xyXG4gICAgICAgICAgICBzWzB4OGZdID0gXCJSb3lhbEJsdWVcIjtcclxuICAgICAgICAgICAgc1sweDkwXSA9IFwiU2FkZGxlQnJvd25cIjtcclxuICAgICAgICAgICAgc1sweDkxXSA9IFwiU2FsbW9uXCI7XHJcbiAgICAgICAgICAgIHNbMHg5Ml0gPSBcIlNhbmR5QnJvd25cIjtcclxuICAgICAgICAgICAgc1sweDkzXSA9IFwiU2VhR3JlZW5cIjtcclxuICAgICAgICAgICAgc1sweDk0XSA9IFwiU2VhU2hlbGxcIjtcclxuICAgICAgICAgICAgc1sweDk1XSA9IFwiU2llbm5hXCI7XHJcbiAgICAgICAgICAgIHNbMTUwXSA9IFwiU2lsdmVyXCI7XHJcbiAgICAgICAgICAgIHNbMHg5N10gPSBcIlNreUJsdWVcIjtcclxuICAgICAgICAgICAgc1sweDk4XSA9IFwiU2xhdGVCbHVlXCI7XHJcbiAgICAgICAgICAgIHNbMHg5OV0gPSBcIlNsYXRlR3JheVwiO1xyXG4gICAgICAgICAgICBzWzB4OWFdID0gXCJTbm93XCI7XHJcbiAgICAgICAgICAgIHNbMHg5Yl0gPSBcIlNwcmluZ0dyZWVuXCI7XHJcbiAgICAgICAgICAgIHNbMHg5Y10gPSBcIlN0ZWVsQmx1ZVwiO1xyXG4gICAgICAgICAgICBzWzB4OWRdID0gXCJUYW5cIjtcclxuICAgICAgICAgICAgc1sweDllXSA9IFwiVGVhbFwiO1xyXG4gICAgICAgICAgICBzWzB4OWZdID0gXCJUaGlzdGxlXCI7XHJcbiAgICAgICAgICAgIHNbMTYwXSA9IFwiVG9tYXRvXCI7XHJcbiAgICAgICAgICAgIHNbMHhhMV0gPSBcIlR1cnF1b2lzZVwiO1xyXG4gICAgICAgICAgICBzWzB4YTJdID0gXCJWaW9sZXRcIjtcclxuICAgICAgICAgICAgc1sweGEzXSA9IFwiV2hlYXRcIjtcclxuICAgICAgICAgICAgc1sweGE0XSA9IFwiV2hpdGVcIjtcclxuICAgICAgICAgICAgc1sweGE1XSA9IFwiV2hpdGVTbW9rZVwiO1xyXG4gICAgICAgICAgICBzWzB4YTZdID0gXCJZZWxsb3dcIjtcclxuICAgICAgICAgICAgc1sweGE3XSA9IFwiWWVsbG93R3JlZW5cIjtcclxuICAgICAgICAgICAgY29sb3JOYW1lVGFibGUgPSBzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBVcGRhdGVTeXN0ZW1Db2xvcnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29sb3JUYWJsZVsxXSA9IFN5c3RlbUNvbG9yVG9BcmdiKDEwKTtcclxuICAgICAgICAgICAgY29sb3JUYWJsZVsyXSA9IFN5c3RlbUNvbG9yVG9BcmdiKDIpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzNdID0gU3lzdGVtQ29sb3JUb0FyZ2IoOSk7XHJcbiAgICAgICAgICAgIGNvbG9yVGFibGVbNF0gPSBTeXN0ZW1Db2xvclRvQXJnYigxMik7XHJcbiAgICAgICAgICAgIGNvbG9yVGFibGVbMTY4XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDE1KTtcclxuICAgICAgICAgICAgY29sb3JUYWJsZVsxNjldID0gU3lzdGVtQ29sb3JUb0FyZ2IoMjApO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzE3MF0gPSBTeXN0ZW1Db2xvclRvQXJnYigweDEwKTtcclxuICAgICAgICAgICAgY29sb3JUYWJsZVs1XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDE1KTtcclxuICAgICAgICAgICAgY29sb3JUYWJsZVs2XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDB4MTApO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzddID0gU3lzdGVtQ29sb3JUb0FyZ2IoMHgxNSk7XHJcbiAgICAgICAgICAgIGNvbG9yVGFibGVbOF0gPSBTeXN0ZW1Db2xvclRvQXJnYigweDE2KTtcclxuICAgICAgICAgICAgY29sb3JUYWJsZVs5XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDIwKTtcclxuICAgICAgICAgICAgY29sb3JUYWJsZVsxMF0gPSBTeXN0ZW1Db2xvclRvQXJnYigweDEyKTtcclxuICAgICAgICAgICAgY29sb3JUYWJsZVsxMV0gPSBTeXN0ZW1Db2xvclRvQXJnYigxKTtcclxuICAgICAgICAgICAgY29sb3JUYWJsZVsxNzFdID0gU3lzdGVtQ29sb3JUb0FyZ2IoMHgxYik7XHJcbiAgICAgICAgICAgIGNvbG9yVGFibGVbMTcyXSA9IFN5c3RlbUNvbG9yVG9BcmdiKDB4MWMpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzEyXSA9IFN5c3RlbUNvbG9yVG9BcmdiKDB4MTEpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzEzXSA9IFN5c3RlbUNvbG9yVG9BcmdiKDEzKTtcclxuICAgICAgICAgICAgY29sb3JUYWJsZVsxNF0gPSBTeXN0ZW1Db2xvclRvQXJnYigxNCk7XHJcbiAgICAgICAgICAgIGNvbG9yVGFibGVbMTVdID0gU3lzdGVtQ29sb3JUb0FyZ2IoMHgxYSk7XHJcbiAgICAgICAgICAgIGNvbG9yVGFibGVbMTZdID0gU3lzdGVtQ29sb3JUb0FyZ2IoMTEpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzE3XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDMpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzE4XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDB4MTMpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzE5XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDB4MTgpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzIwXSA9IFN5c3RlbUNvbG9yVG9BcmdiKDB4MTcpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzIxXSA9IFN5c3RlbUNvbG9yVG9BcmdiKDQpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzE3M10gPSBTeXN0ZW1Db2xvclRvQXJnYigzMCk7XHJcbiAgICAgICAgICAgIGNvbG9yVGFibGVbMTc0XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDB4MWQpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzIyXSA9IFN5c3RlbUNvbG9yVG9BcmdiKDcpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzIzXSA9IFN5c3RlbUNvbG9yVG9BcmdiKDApO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzI0XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDUpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzI1XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDYpO1xyXG4gICAgICAgICAgICBjb2xvclRhYmxlWzI2XSA9IFN5c3RlbUNvbG9yVG9BcmdiKDgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgSW5pdENvbG9yVGFibGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50W10gYyA9IG5ldyBpbnRbMHhhZl07XHJcblxyXG4gICAgICAgICAgICBjWzB4MWJdID0gMHhmZmZmZmY7XHJcbiAgICAgICAgICAgIGNbMHgxY10gPSAtOTg0ODMzO1xyXG4gICAgICAgICAgICBjWzB4MWRdID0gLTMzMjg0MTtcclxuICAgICAgICAgICAgY1szMF0gPSAtMTY3MTE2ODE7XHJcbiAgICAgICAgICAgIGNbMHgxZl0gPSAtODM4ODY1MjtcclxuICAgICAgICAgICAgY1sweDIwXSA9IC05ODMwNDE7XHJcbiAgICAgICAgICAgIGNbMHgyMV0gPSAtNjU3OTU2O1xyXG4gICAgICAgICAgICBjWzB4MjJdID0gLTY5NzI7XHJcbiAgICAgICAgICAgIGNbMHgyM10gPSAtMTY3NzcyMTY7XHJcbiAgICAgICAgICAgIGNbMHgyNF0gPSAtNTE3MTtcclxuICAgICAgICAgICAgY1sweDI1XSA9IC0xNjc3Njk2MTtcclxuICAgICAgICAgICAgY1sweDI2XSA9IC03NzIyMDE0O1xyXG4gICAgICAgICAgICBjWzB4MjddID0gLTU5NTI5ODI7XHJcbiAgICAgICAgICAgIGNbNDBdID0gLTIxODA5ODU7XHJcbiAgICAgICAgICAgIGNbMHgyOV0gPSAtMTA1MTA2ODg7XHJcbiAgICAgICAgICAgIGNbMHgyYV0gPSAtODM4ODg2NDtcclxuICAgICAgICAgICAgY1sweDJiXSA9IC0yOTg3NzQ2O1xyXG4gICAgICAgICAgICBjWzB4MmNdID0gLTMyOTQ0O1xyXG4gICAgICAgICAgICBjWzB4MmRdID0gLTEwMTg1MjM1O1xyXG4gICAgICAgICAgICBjWzB4MmVdID0gLTE4Mjg7XHJcbiAgICAgICAgICAgIGNbMHgyZl0gPSAtMjM1NDExNjtcclxuICAgICAgICAgICAgY1sweDMwXSA9IC0xNjcxMTY4MTtcclxuICAgICAgICAgICAgY1sweDMxXSA9IC0xNjc3NzA3NztcclxuICAgICAgICAgICAgY1s1MF0gPSAtMTY3NDE0OTM7XHJcbiAgICAgICAgICAgIGNbMHgzM10gPSAtNDY4NDI3NztcclxuICAgICAgICAgICAgY1sweDM0XSA9IC01NjU4MTk5O1xyXG4gICAgICAgICAgICBjWzB4MzVdID0gLTE2NzUxNjE2O1xyXG4gICAgICAgICAgICBjWzB4MzZdID0gLTQzNDM5NTc7XHJcbiAgICAgICAgICAgIGNbMHgzN10gPSAtNzY2NzU3MztcclxuICAgICAgICAgICAgY1sweDM4XSA9IC0xMTE3OTIxNztcclxuICAgICAgICAgICAgY1sweDM5XSA9IC0yOTY5NjtcclxuICAgICAgICAgICAgY1sweDNhXSA9IC02NzM3MjA0O1xyXG4gICAgICAgICAgICBjWzB4M2JdID0gLTc2Njc3MTI7XHJcbiAgICAgICAgICAgIGNbNjBdID0gLTE0Njg4MDY7XHJcbiAgICAgICAgICAgIGNbMHgzZF0gPSAtNzM1NzMwMTtcclxuICAgICAgICAgICAgY1sweDNlXSA9IC0xMjA0Mjg2OTtcclxuICAgICAgICAgICAgY1sweDNmXSA9IC0xMzY3NjcyMTtcclxuICAgICAgICAgICAgY1sweDQwXSA9IC0xNjcyNDI3MTtcclxuICAgICAgICAgICAgY1sweDQxXSA9IC03MDc3Njc3O1xyXG4gICAgICAgICAgICBjWzB4NDJdID0gLTYwMjY5O1xyXG4gICAgICAgICAgICBjWzB4NDNdID0gLTE2NzI4MDY1O1xyXG4gICAgICAgICAgICBjWzB4NDRdID0gLTk4Njg5NTE7XHJcbiAgICAgICAgICAgIGNbMHg0NV0gPSAtMTQ3NzQwMTc7XHJcbiAgICAgICAgICAgIGNbNzBdID0gLTUxMDMwNzA7XHJcbiAgICAgICAgICAgIGNbMHg0N10gPSAtMTI5NjtcclxuICAgICAgICAgICAgY1sweDQ4XSA9IC0xNDUxMzM3NDtcclxuICAgICAgICAgICAgY1sweDQ5XSA9IC02NTI4MTtcclxuICAgICAgICAgICAgY1sweDRhXSA9IC0yMzAyNzU2O1xyXG4gICAgICAgICAgICBjWzB4NGJdID0gLTQ2MDU0NTtcclxuICAgICAgICAgICAgY1sweDRjXSA9IC0xMDQ5NjtcclxuICAgICAgICAgICAgY1sweDRkXSA9IC0yNDQ4MDk2O1xyXG4gICAgICAgICAgICBjWzB4NGVdID0gLTgzNTU3MTI7XHJcbiAgICAgICAgICAgIGNbMHg0Zl0gPSAtMTY3NDQ0NDg7XHJcbiAgICAgICAgICAgIGNbODBdID0gLTUzNzQxNjE7XHJcbiAgICAgICAgICAgIGNbMHg1MV0gPSAtOTgzMDU2O1xyXG4gICAgICAgICAgICBjWzB4NTJdID0gLTM4NDc2O1xyXG4gICAgICAgICAgICBjWzB4NTNdID0gLTMzMTg2OTI7XHJcbiAgICAgICAgICAgIGNbMHg1NF0gPSAtMTE4NjE4ODY7XHJcbiAgICAgICAgICAgIGNbMHg1NV0gPSAtMTY7XHJcbiAgICAgICAgICAgIGNbMHg1Nl0gPSAtOTg5NTU2O1xyXG4gICAgICAgICAgICBjWzB4NTddID0gLTE2NDQ4MDY7XHJcbiAgICAgICAgICAgIGNbMHg1OF0gPSAtMzg1MTtcclxuICAgICAgICAgICAgY1sweDU5XSA9IC04NTg2MjQwO1xyXG4gICAgICAgICAgICBjWzkwXSA9IC0xMzMxO1xyXG4gICAgICAgICAgICBjWzB4NWJdID0gLTUzODM5NjI7XHJcbiAgICAgICAgICAgIGNbMHg1Y10gPSAtMTAxNTY4MDtcclxuICAgICAgICAgICAgY1sweDVkXSA9IC0yMDMxNjE3O1xyXG4gICAgICAgICAgICBjWzB4NWVdID0gLTMyOTAwNjtcclxuICAgICAgICAgICAgY1sweDVmXSA9IC0yODk0ODkzO1xyXG4gICAgICAgICAgICBjWzB4NjBdID0gLTcyNzg5NjA7XHJcbiAgICAgICAgICAgIGNbMHg2MV0gPSAtMTg3NTE7XHJcbiAgICAgICAgICAgIGNbMHg2Ml0gPSAtMjQ0NTQ7XHJcbiAgICAgICAgICAgIGNbMHg2M10gPSAtMTQ2MzQzMjY7XHJcbiAgICAgICAgICAgIGNbMTAwXSA9IC03ODc2ODcwO1xyXG4gICAgICAgICAgICBjWzB4NjVdID0gLTg5NDM0NjM7XHJcbiAgICAgICAgICAgIGNbMHg2Nl0gPSAtNTE5MjQ4MjtcclxuICAgICAgICAgICAgY1sweDY3XSA9IC0zMjtcclxuICAgICAgICAgICAgY1sweDY4XSA9IC0xNjcxMTkzNjtcclxuICAgICAgICAgICAgY1sweDY5XSA9IC0xMzQ0Nzg4NjtcclxuICAgICAgICAgICAgY1sweDZhXSA9IC0zMzE1NDY7XHJcbiAgICAgICAgICAgIGNbMHg2Yl0gPSAtNjUyODE7XHJcbiAgICAgICAgICAgIGNbMHg2Y10gPSAtODM4ODYwODtcclxuICAgICAgICAgICAgY1sweDZkXSA9IC0xMDAzOTg5NDtcclxuICAgICAgICAgICAgY1sxMTBdID0gLTE2Nzc3MDExO1xyXG4gICAgICAgICAgICBjWzB4NmZdID0gLTQ1NjU1NDk7XHJcbiAgICAgICAgICAgIGNbMHg3MF0gPSAtNzExNDUzMztcclxuICAgICAgICAgICAgY1sweDcxXSA9IC0xMjc5OTExOTtcclxuICAgICAgICAgICAgY1sweDcyXSA9IC04Njg5NDI2O1xyXG4gICAgICAgICAgICBjWzB4NzNdID0gLTE2NzEzMDYyO1xyXG4gICAgICAgICAgICBjWzB4NzRdID0gLTEyMDA0OTE2O1xyXG4gICAgICAgICAgICBjWzB4NzVdID0gLTM3MzAwNDM7XHJcbiAgICAgICAgICAgIGNbMHg3Nl0gPSAtMTUxMzIzMDQ7XHJcbiAgICAgICAgICAgIGNbMHg3N10gPSAtNjU1MzY2O1xyXG4gICAgICAgICAgICBjWzEyMF0gPSAtNjk0MztcclxuICAgICAgICAgICAgY1sweDc5XSA9IC02OTg3O1xyXG4gICAgICAgICAgICBjWzB4N2FdID0gLTg1MzE7XHJcbiAgICAgICAgICAgIGNbMHg3Yl0gPSAtMTY3NzcwODg7XHJcbiAgICAgICAgICAgIGNbMHg3Y10gPSAtMTMzNjU4O1xyXG4gICAgICAgICAgICBjWzB4N2RdID0gLTgzNTU4NDA7XHJcbiAgICAgICAgICAgIGNbMHg3ZV0gPSAtOTcyODQ3NztcclxuICAgICAgICAgICAgY1sweDdmXSA9IC0yMzI5NjtcclxuICAgICAgICAgICAgY1sweDgwXSA9IC00Nzg3MjtcclxuICAgICAgICAgICAgY1sweDgxXSA9IC0yNDYxNDgyO1xyXG4gICAgICAgICAgICBjWzEzMF0gPSAtMTEyMDA4NjtcclxuICAgICAgICAgICAgY1sweDgzXSA9IC02NzUxMzM2O1xyXG4gICAgICAgICAgICBjWzB4ODRdID0gLTUyNDcyNTA7XHJcbiAgICAgICAgICAgIGNbMHg4NV0gPSAtMjM5NjAxMztcclxuICAgICAgICAgICAgY1sweDg2XSA9IC00MTM5O1xyXG4gICAgICAgICAgICBjWzB4ODddID0gLTk1NDM7XHJcbiAgICAgICAgICAgIGNbMHg4OF0gPSAtMzMwODIyNTtcclxuICAgICAgICAgICAgY1sweDg5XSA9IC0xNjE4MTtcclxuICAgICAgICAgICAgY1sweDhhXSA9IC0yMjUyNTc5O1xyXG4gICAgICAgICAgICBjWzB4OGJdID0gLTUxODUzMDY7XHJcbiAgICAgICAgICAgIGNbMTQwXSA9IC04Mzg4NDgwO1xyXG4gICAgICAgICAgICBjWzB4OGRdID0gLTY1NTM2O1xyXG4gICAgICAgICAgICBjWzB4OGVdID0gLTQ0MTk2OTc7XHJcbiAgICAgICAgICAgIGNbMHg4Zl0gPSAtMTI0OTAyNzE7XHJcbiAgICAgICAgICAgIGNbMHg5MF0gPSAtNzY1MDAyOTtcclxuICAgICAgICAgICAgY1sweDkxXSA9IC0zNjAzMzQ7XHJcbiAgICAgICAgICAgIGNbMHg5Ml0gPSAtNzQ0MzUyO1xyXG4gICAgICAgICAgICBjWzB4OTNdID0gLTEzNzI2ODg5O1xyXG4gICAgICAgICAgICBjWzB4OTRdID0gLTI1Nzg7XHJcbiAgICAgICAgICAgIGNbMHg5NV0gPSAtNjI3MDQxOTtcclxuICAgICAgICAgICAgY1sxNTBdID0gLTQxNDQ5NjA7XHJcbiAgICAgICAgICAgIGNbMHg5N10gPSAtNzg3Njg4NTtcclxuICAgICAgICAgICAgY1sweDk4XSA9IC05ODA3MTU1O1xyXG4gICAgICAgICAgICBjWzB4OTldID0gLTk0MDQyNzI7XHJcbiAgICAgICAgICAgIGNbMHg5YV0gPSAtMTI4NjtcclxuICAgICAgICAgICAgY1sweDliXSA9IC0xNjcxMTgwOTtcclxuICAgICAgICAgICAgY1sweDljXSA9IC0xMjE1NjIzNjtcclxuICAgICAgICAgICAgY1sweDlkXSA9IC0yOTY4NDM2O1xyXG4gICAgICAgICAgICBjWzB4OWVdID0gLTE2NzQ0MzIwO1xyXG4gICAgICAgICAgICBjWzB4OWZdID0gLTI1NzIzMjg7XHJcbiAgICAgICAgICAgIGNbMTYwXSA9IC00MDEyMTtcclxuICAgICAgICAgICAgY1sweGExXSA9IC0xMjUyNTM2MDtcclxuICAgICAgICAgICAgY1sweGEyXSA9IC0xMTQ2MTMwO1xyXG4gICAgICAgICAgICBjWzB4YTNdID0gLTY2Mzg4NTtcclxuICAgICAgICAgICAgY1sweGE0XSA9IC0xO1xyXG4gICAgICAgICAgICBjWzB4YTVdID0gLTY1NzkzMTtcclxuICAgICAgICAgICAgY1sweGE2XSA9IC0yNTY7XHJcbiAgICAgICAgICAgIGNbMHhhN10gPSAtNjYzMjE0MjtcclxuICAgICAgICAgICAgY29sb3JUYWJsZSA9IGM7XHJcblxyXG4gICAgICAgICAgICBVcGRhdGVTeXN0ZW1Db2xvcnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEtub3duQ29sb3JUb0FyZ2IoS25vd25Db2xvciBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVuc3VyZUNvbG9yVGFibGUoKTtcclxuICAgICAgICAgICAgaWYgKGNvbG9yIDw9IEtub3duQ29sb3IuTWVudUhpZ2hsaWdodClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9yVGFibGVbKGludCljb2xvcl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBLbm93bkNvbG9yVG9OYW1lKEtub3duQ29sb3IgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbnN1cmVDb2xvck5hbWVUYWJsZSgpO1xyXG4gICAgICAgICAgICBpZiAoY29sb3IgPD0gS25vd25Db2xvci5NZW51SGlnaGxpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3JOYW1lVGFibGVbKGludCljb2xvcl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnRbXSBfU3lzQ29sb3JzID0gbmV3IGludFtdIFxyXG4gICAgICAgICAgICB7MTE4NDI3NDAsXHJcbiAgICAgICAgICAgIDEzNzQzMjU3LFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAxMTI1MDYwMyxcclxuICAgICAgICAgICAgMTU3OTAzMjAsXHJcbiAgICAgICAgICAgIDE2Nzc3MjE1LFxyXG4gICAgICAgICAgICAxMDUyNjg4MCxcclxuICAgICAgICAgICAgMTU3OTAzMjAsXHJcbiAgICAgICAgICAgIDEwNTI2ODgwLFxyXG4gICAgICAgICAgICA2OTA4MjY1LFxyXG4gICAgICAgICAgICAxNDkzNTAxMSxcclxuICAgICAgICAgICAgMTY3NzcyMTUsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDE1Mzg5MTEzLFxyXG4gICAgICAgICAgICAxNTkxODI5NSxcclxuICAgICAgICAgICAgNzE3MTQzNyxcclxuICAgICAgICAgICAgMTY3NTA4OTksXHJcbiAgICAgICAgICAgIDE2Nzc3MjE1LFxyXG4gICAgICAgICAgICAxMzM5NTQ1NixcclxuICAgICAgICAgICAgMTY1Nzg1NDgsXHJcbiAgICAgICAgICAgIDE0NDA1MDU1LFxyXG4gICAgICAgICAgICA1NTI1MDU5LFxyXG4gICAgICAgICAgICAxNDgxMTEzNSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMTU3OTAzMjAsXHJcbiAgICAgICAgICAgIDE1NzkwMzIwLFxyXG4gICAgICAgICAgICAxNjc1MDg5OSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMTMxNTg2MDAsXHJcbiAgICAgICAgICAgIDE2Nzc3MjE1LFxyXG4gICAgICAgICAgICA2NTc5MzAwLFxyXG4gICAgICAgICAgICAwfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IFN5c3RlbUNvbG9yVG9BcmdiKGludCBpbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBGcm9tV2luMzJWYWx1ZShfU3lzQ29sb3JzW2luZGV4XSk7XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLkRyYXdpbmdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEZvbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEZhbWlseU5hbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGZsb2F0IEVtU2l6ZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEZvbnQoc3RyaW5nIGZhbWlseU5hbWUsIGZsb2F0IGVtU2l6ZSwgRm9udFN0eWxlIHN0eWxlLCBHcmFwaGljc1VuaXQgdW5pdCwgYnl0ZSBnZGlDaGFyU2V0KSA6IHRoaXMoZmFtaWx5TmFtZSwgZW1TaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRm9udChzdHJpbmcgZmFtaWx5TmFtZSwgZmxvYXQgZW1TaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRmFtaWx5TmFtZSA9IGZhbWlseU5hbWU7XHJcbiAgICAgICAgICAgIEVtU2l6ZSA9IGVtU2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uRHJhd2luZ1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFBvaW50XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGludCBYO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgWTtcclxuICAgICAgICBwdWJsaWMgUG9pbnQoaW50IHgsIGludCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IHg7XHJcbiAgICAgICAgICAgIFkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uRHJhd2luZ1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFNpemVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IFdpZHRoO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFNpemUgRW1wdHkgPSBuZXcgU2l6ZSgwLCAwKTtcclxuXHJcbiAgICAgICAgcHVibGljIFNpemUoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uRHJhd2luZ1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFNpemVGXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFdpZHRoO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBIZWlnaHQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTaXplRihmbG9hdCB3aWR0aCwgZmxvYXQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5EcmF3aW5nXHJcbntcclxuICAgIHB1YmxpYyBzZWFsZWQgY2xhc3MgU3lzdGVtQ29sb3JzXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBBY3RpdmVCb3JkZXIge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuQWN0aXZlQm9yZGVyKTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEFjdGl2ZUNhcHRpb24ge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuQWN0aXZlQ2FwdGlvbik7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBBY3RpdmVDYXB0aW9uVGV4dCB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5BY3RpdmVDYXB0aW9uVGV4dCk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBBcHBXb3Jrc3BhY2Uge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuQXBwV29ya3NwYWNlKTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEJ1dHRvbkZhY2Uge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuQnV0dG9uRmFjZSk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBCdXR0b25IaWdobGlnaHQge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuQnV0dG9uSGlnaGxpZ2h0KTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEJ1dHRvblNoYWRvdyB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5CdXR0b25TaGFkb3cpO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQ29udHJvbCB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Db250cm9sKTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIENvbnRyb2xEYXJrIHtnZXR7cmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkNvbnRyb2xEYXJrKTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIENvbnRyb2xEYXJrRGFyayB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Db250cm9sRGFya0RhcmspO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgQ29udHJvbExpZ2h0IHtnZXR7cmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkNvbnRyb2xMaWdodCk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBDb250cm9sTGlnaHRMaWdodCB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Db250cm9sTGlnaHRMaWdodCk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBDb250cm9sVGV4dCB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Db250cm9sVGV4dCk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBEZXNrdG9wIHtnZXR7cmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkRlc2t0b3ApO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgR3JhZGllbnRBY3RpdmVDYXB0aW9uIHtnZXR7cmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkdyYWRpZW50QWN0aXZlQ2FwdGlvbik7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBHcmFkaWVudEluYWN0aXZlQ2FwdGlvbiB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5HcmFkaWVudEluYWN0aXZlQ2FwdGlvbik7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBHcmF5VGV4dCB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5HcmF5VGV4dCk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBIaWdobGlnaHQge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuSGlnaGxpZ2h0KTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEhpZ2hsaWdodFRleHQge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuSGlnaGxpZ2h0VGV4dCk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBIb3RUcmFjayB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5Ib3RUcmFjayk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBJbmFjdGl2ZUJvcmRlciB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5JbmFjdGl2ZUJvcmRlcik7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBJbmFjdGl2ZUNhcHRpb24ge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuSW5hY3RpdmVDYXB0aW9uKTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIEluYWN0aXZlQ2FwdGlvblRleHQge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuSW5hY3RpdmVDYXB0aW9uVGV4dCk7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBJbmZvIHtnZXR7cmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLkluZm8pO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgSW5mb1RleHQge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuSW5mb1RleHQpO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTWVudSB7Z2V0e3JldHVybiBuZXcgQ29sb3IoS25vd25Db2xvci5NZW51KTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIE1lbnVCYXIge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTWVudUJhcik7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBNZW51SGlnaGxpZ2h0IHtnZXR7cmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLk1lbnVIaWdobGlnaHQpO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgTWVudVRleHQge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuTWVudVRleHQpO319XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgU2Nyb2xsQmFyIHtnZXR7cmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLlNjcm9sbEJhcik7fX1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciBXaW5kb3cge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuV2luZG93KTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFdpbmRvd0ZyYW1lIHtnZXR7cmV0dXJuIG5ldyBDb2xvcihLbm93bkNvbG9yLldpbmRvd0ZyYW1lKTt9fVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIFdpbmRvd1RleHQge2dldHtyZXR1cm4gbmV3IENvbG9yKEtub3duQ29sb3IuV2luZG93VGV4dCk7fX1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLldpbmRvd3MuRm9ybXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERhdGFHcmlkVmlld0NvbHVtblxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIFJldHlwZWQuZG9tLkhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50IEVsZW1lbnQ7XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBIZWFkZXJUZXh0IHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIEVsZW1lbnQudGV4dENvbnRlbnQ7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBFbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lIHsgZ2V0IHsgcmV0dXJuIEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiTmFtZVwiKTsgfSBzZXQgeyBFbGVtZW50LnNldEF0dHJpYnV0ZShcIk5hbWVcIiwgdmFsdWUpOyB9IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERhdGFQcm9wZXJ0eU5hbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRGF0YUdyaWRWaWV3Q29sdW1uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQgPSBuZXcgUmV0eXBlZC5kb20uSFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uV2luZG93cy5Gb3Jtc1xyXG57XHJcbiAgICBwdWJsaWMgZGVsZWdhdGUgdm9pZCBMaW5rTGFiZWxMaW5rQ2xpY2tlZEV2ZW50SGFuZGxlcihvYmplY3Qgc2VuZGVyLCBMaW5rTGFiZWxMaW5rQ2xpY2tlZEV2ZW50QXJncyBlKTtcclxuICAgIC8vXHJcbiAgICAvLyBTdW1tYXJ5OlxyXG4gICAgLy8gICAgIFByb3ZpZGVzIGRhdGEgZm9yIHRoZSBTeXN0ZW0uV2luZG93cy5Gb3Jtcy5MaW5rTGFiZWwuTGlua0NsaWNrZWQgZXZlbnQuICAgIFxyXG4gICAgcHVibGljIGNsYXNzIExpbmtMYWJlbExpbmtDbGlja2VkRXZlbnRBcmdzIDogRXZlbnRBcmdzXHJcbiAgICB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBTdW1tYXJ5OlxyXG4gICAgICAgIC8vICAgICBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgU3lzdGVtLldpbmRvd3MuRm9ybXMuTGlua0xhYmVsTGlua0NsaWNrZWRFdmVudEFyZ3NcclxuICAgICAgICAvLyAgICAgY2xhc3Mgd2l0aCB0aGUgc3BlY2lmaWVkIGxpbmsuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBQYXJhbWV0ZXJzOlxyXG4gICAgICAgIC8vICAgbGluazpcclxuICAgICAgICAvLyAgICAgVGhlIFN5c3RlbS5XaW5kb3dzLkZvcm1zLkxpbmtMYWJlbC5MaW5rIHRoYXQgd2FzIGNsaWNrZWQuXHJcbiAgICAgICAgcHVibGljIExpbmtMYWJlbExpbmtDbGlja2VkRXZlbnRBcmdzKExpbmtMYWJlbC5MaW5rIGxpbmspXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBTdW1tYXJ5OlxyXG4gICAgICAgIC8vICAgICBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgU3lzdGVtLldpbmRvd3MuRm9ybXMuTGlua0xhYmVsTGlua0NsaWNrZWRFdmVudEFyZ3NcclxuICAgICAgICAvLyAgICAgY2xhc3Mgd2l0aCB0aGUgc3BlY2lmaWVkIGxpbmsgYW5kIHRoZSBzcGVjaWZpZWQgbW91c2UgYnV0dG9uLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gUGFyYW1ldGVyczpcclxuICAgICAgICAvLyAgIGxpbms6XHJcbiAgICAgICAgLy8gICAgIFRoZSBTeXN0ZW0uV2luZG93cy5Gb3Jtcy5MaW5rTGFiZWwuTGluayB0aGF0IHdhcyBjbGlja2VkLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICBidXR0b246XHJcbiAgICAgICAgLy8gICAgIE9uZSBvZiB0aGUgU3lzdGVtLldpbmRvd3MuRm9ybXMuTW91c2VCdXR0b25zIHZhbHVlcy5cclxuICAgICAgICBwdWJsaWMgTGlua0xhYmVsTGlua0NsaWNrZWRFdmVudEFyZ3MoTGlua0xhYmVsLkxpbmsgbGluaywgTW91c2VCdXR0b25zIGJ1dHRvbilcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBTdW1tYXJ5OlxyXG4gICAgICAgIC8vICAgICBHZXRzIHRoZSBtb3VzZSBidXR0b24gdGhhdCBjYXVzZXMgdGhlIGxpbmsgdG8gYmUgY2xpY2tlZC5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFJldHVybnM6XHJcbiAgICAgICAgLy8gICAgIE9uZSBvZiB0aGUgU3lzdGVtLldpbmRvd3MuRm9ybXMuTW91c2VCdXR0b25zIHZhbHVlcy5cclxuICAgICAgICBwdWJsaWMgTW91c2VCdXR0b25zIEJ1dHRvbiB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFN1bW1hcnk6XHJcbiAgICAgICAgLy8gICAgIEdldHMgdGhlIFN5c3RlbS5XaW5kb3dzLkZvcm1zLkxpbmtMYWJlbC5MaW5rIHRoYXQgd2FzIGNsaWNrZWQuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBSZXR1cm5zOlxyXG4gICAgICAgIC8vICAgICBBIGxpbmsgb24gdGhlIFN5c3RlbS5XaW5kb3dzLkZvcm1zLkxpbmtMYWJlbC5cclxuICAgICAgICBwdWJsaWMgTGlua0xhYmVsLkxpbmsgTGluayB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uV2luZG93cy5Gb3Jtc1xyXG57XHJcbiAgICAvL1xyXG4gICAgLy8gU3VtbWFyeTpcclxuICAgIC8vICAgICBSZXByZXNlbnRzIHRoZSBjb2xsZWN0aW9uIG9mIGl0ZW1zIGluIGEgU3lzdGVtLldpbmRvd3MuRm9ybXMuQ29tYm9Cb3guXHJcbiAgICBwdWJsaWMgY2xhc3MgT2JqZWN0Q29sbGVjdGlvbiA6IElMaXN0PG9iamVjdD4sIElDb2xsZWN0aW9uLCBJRW51bWVyYWJsZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgQ29udHJvbCBfb3duZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBPYmplY3RDb2xsZWN0aW9uKENvbnRyb2wgb3duZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfb3duZXIgPSBvd25lcjtcclxuICAgICAgICAgICAgX2NvbnRyb2xzID0gbmV3IExpc3Q8b2JqZWN0PigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIENvbnRyb2wgT3duZXIgeyBnZXQgeyByZXR1cm4gX293bmVyOyB9IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PG9iamVjdD4gX2NvbnRyb2xzO1xyXG5cclxuICAgICAgICBwdWJsaWMgb2JqZWN0IHRoaXNbaW50IGluZGV4XVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9jb250cm9sc1tpbmRleF07IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9jb250cm9sc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBDb3VudCB7IGdldCB7IHJldHVybiBfY29udHJvbHMuQ291bnQ7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc1JlYWRPbmx5IHsgZ2V0IHsgcmV0dXJuIGZhbHNlOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKG9iamVjdCBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX293bmVyLkVsZW1lbnQuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MT3B0aW9uRWxlbWVudD4obmV3IFJldHlwZWQuZG9tLkhUTUxPcHRpb25FbGVtZW50KCkgeyB2YWx1ZSA9IF9jb250cm9scy5Db3VudC5Ub1N0cmluZygpLCB0ZXh0Q29udGVudCA9IChpdGVtICsgXCJcIikgfSApO1xyXG4gICAgICAgICAgICBfY29udHJvbHMuQWRkKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkUmFuZ2Uob2JqZWN0W10gaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtID09IG51bGwgfHwgaXRlbS5MZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGZyYWcgPSBSZXR5cGVkLmRvbS5kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaXRlbS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxPcHRpb25FbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTE9wdGlvbkVsZW1lbnQoKSB7IHZhbHVlID0gX2NvbnRyb2xzLkNvdW50LlRvU3RyaW5nKCksIHRleHRDb250ZW50ID0gKGl0ZW1baV0gKyBcIlwiKSB9KTtcclxuICAgICAgICAgICAgICAgIF9jb250cm9scy5BZGQoaXRlbVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX293bmVyLkVsZW1lbnQuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5Eb2N1bWVudEZyYWdtZW50PihmcmFnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENsZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8qQFxyXG5cdFx0XHR2YXIgbGVuID0gX293bmVyLkVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGg7XHJcblx0XHRcdHdoaWxlKGxlbi0tKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0X293bmVyLkVsZW1lbnQucmVtb3ZlQ2hpbGQoX293bmVyLkVsZW1lbnQubGFzdENoaWxkKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Ki9cclxuICAgICAgICAgICAgX2NvbnRyb2xzLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhvYmplY3QgaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29udHJvbHMuQ29udGFpbnMoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDb3B5VG8ob2JqZWN0W10gYXJyYXksIGludCBhcnJheUluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRyb2xzLkNvcHlUbyhhcnJheSwgYXJyYXlJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDb3B5VG8oQXJyYXkgYXJyYXksIGludCBhcnJheUluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRyb2xzLkNvcHlUbygob2JqZWN0W10pYXJyYXksIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElFbnVtZXJhdG9yPG9iamVjdD4gR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbnRyb2xzLkdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5kZXhPZihvYmplY3QgaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29udHJvbHMuSW5kZXhPZihpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluc2VydChpbnQgaW5kZXgsIG9iamVjdCBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX293bmVyLkVsZW1lbnQuaW5zZXJ0QmVmb3JlPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTE9wdGlvbkVsZW1lbnQ+KG5ldyBSZXR5cGVkLmRvbS5IVE1MT3B0aW9uRWxlbWVudCgpIHsgdmFsdWUgPSBfY29udHJvbHMuQ291bnQuVG9TdHJpbmcoKSwgdGV4dENvbnRlbnQgPSAoaXRlbSArIFwiXCIpIH0sIF9vd25lci5FbGVtZW50LmNoaWxkTm9kZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgX2NvbnRyb2xzLkluc2VydChpbmRleCwgaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBSZW1vdmUob2JqZWN0IGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfb3duZXIuRWxlbWVudC5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLk5vZGU+KF9vd25lci5FbGVtZW50LmNoaWxkTm9kZXNbX2NvbnRyb2xzLkluZGV4T2YoaXRlbSldKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIF9jb250cm9scy5SZW1vdmUoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVBdChpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfb3duZXIuRWxlbWVudC5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLk5vZGU+KF9vd25lci5FbGVtZW50LmNoaWxkTm9kZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgX2NvbnRyb2xzLlJlbW92ZUF0KGluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIElFbnVtZXJhdG9yIElFbnVtZXJhYmxlLkdldEVudW1lcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb250cm9scy5HZXRFbnVtZXJhdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uV2luZG93cy5Gb3Jtc1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFBhZGRpbmdcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IExlZnQsIFRvcCwgUmlnaHQsIEJvdHRvbTtcclxuICAgICAgICBwdWJsaWMgUGFkZGluZyhpbnQgbGVmdCwgaW50IHRvcCwgaW50IHJpZ2h0LCBpbnQgYm90dG9tKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGVmdCA9IGxlZnQ7IFRvcCA9IHRvcDsgUmlnaHQgPSByaWdodDsgQm90dG9tID0gYm90dG9tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uRHJhd2luZztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5XaW5kb3dzLkZvcm1zXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb21ib0JveCA6IENvbnRyb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQ29tYm9Cb3goKSA6IGJhc2UobmV3IFJldHlwZWQuZG9tLkhUTUxTZWxlY3RFbGVtZW50KCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJdGVtcyA9IG5ldyBPYmplY3RDb2xsZWN0aW9uKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0Q29sbGVjdGlvbiBJdGVtcyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIEZvcm1hdHRpbmdFbmFibGVkIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBpbnQgSXRlbUhlaWdodCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIERyYXdNb2RlIERyYXdNb2RlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBTaXplIE1pbmltdW1TaXplIHsgZ2V0OyBzZXQ7IH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTGlzdEJveCA6IENvbnRyb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTGlzdEJveCgpIDogYmFzZShuZXcgUmV0eXBlZC5kb20uSFRNTFNlbGVjdEVsZW1lbnQoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQuQXM8UmV0eXBlZC5kb20uSFRNTFNlbGVjdEVsZW1lbnQ+KCkubXVsdGlwbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBJdGVtcyA9IG5ldyBPYmplY3RDb2xsZWN0aW9uKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgT2JqZWN0Q29sbGVjdGlvbiBJdGVtcyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIEZvcm1hdHRpbmdFbmFibGVkIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBpbnQgSXRlbUhlaWdodCB7IGdldDsgc2V0OyB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5XaW5kb3dzLkZvcm1zXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0Qm94IDogQ29udHJvbFxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFRleHRCb3goKSA6IGJhc2UobmV3IFJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQoKSB7IHR5cGUgPSBcInRleHRcIiB9KVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRleHQgeyBnZXQgeyByZXR1cm4gRWxlbWVudC5BczxSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PigpLnZhbHVlOyB9IHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXNlLlRleHQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIEVsZW1lbnQuQXM8UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4oKS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uV2luZG93cy5Gb3Jtc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQnV0dG9uQmFzZSA6IENvbnRyb2xcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgQnV0dG9uQmFzZShSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCBlbGVtZW50KSA6IGJhc2UoZWxlbWVudClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBBdXRvU2l6ZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUZXh0IHsgZ2V0IHsgcmV0dXJuIGJhc2UuVGV4dDsgfSBzZXQge1xyXG4gICAgICAgICAgICAgICAgYmFzZS5UZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBFbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0gfVxyXG4gICAgICAgIHB1YmxpYyBib29sIFVzZVZpc3VhbFN0eWxlQmFja0NvbG9yIHsgZ2V0OyBzZXQ7IH0gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLldpbmRvd3MuRm9ybXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENvbnRhaW5lckNvbnRyb2wgOiBDb250cm9sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFNpemVGIEF1dG9TY2FsZURpbWVuc2lvbnMgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBBdXRvU2NhbGVNb2RlIEF1dG9TY2FsZU1vZGUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQ29udGFpbmVyQ29udHJvbCgpIDogYmFzZShuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uV2luZG93cy5Gb3Jtc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVE9ETyAtIGFkZCBjb250cm9scyB2aWEgaHRtbC4uLi5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29udHJvbENvbGxlY3Rpb24gOiBJTGlzdDxDb250cm9sPiwgSUNvbGxlY3Rpb24sIElFbnVtZXJhYmxlXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgQ29udHJvbCBfb3duZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBDb250cm9sQ29sbGVjdGlvbihDb250cm9sIG93bmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX293bmVyID0gb3duZXI7XHJcbiAgICAgICAgICAgIF9jb250cm9scyA9IG5ldyBMaXN0PENvbnRyb2w+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQ29udHJvbCBPd25lciB7IGdldCB7IHJldHVybiBfb3duZXI7IH0gfVxyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8Q29udHJvbD4gX2NvbnRyb2xzO1xyXG5cclxuICAgICAgICBwdWJsaWMgQ29udHJvbCB0aGlzW2ludCBpbmRleF0geyBnZXQgeyByZXR1cm4gX2NvbnRyb2xzW2luZGV4XTsgIH0gc2V0IHtcclxuICAgICAgICAgICAgICAgIF9jb250cm9sc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ291bnQgeyBnZXQgeyByZXR1cm4gX2NvbnRyb2xzLkNvdW50OyAgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzUmVhZE9ubHkgeyBnZXQgeyByZXR1cm4gZmFsc2U7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoQ29udHJvbCBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX293bmVyLkVsZW1lbnQuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRWxlbWVudD4oaXRlbS5FbGVtZW50KTtcclxuICAgICAgICAgICAgaXRlbS5fcGFyZW50ID0gT3duZXI7XHJcbiAgICAgICAgICAgIGl0ZW0uTG9hZCgpO1xyXG4gICAgICAgICAgICBfY29udHJvbHMuQWRkKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkUmFuZ2UoQ29udHJvbFtdIGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoaXRlbSA9PSBudWxsIHx8IGl0ZW0uTGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBmcmFnID0gUmV0eXBlZC5kb20uZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGl0ZW0uTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRWxlbWVudD4oaXRlbVtpXS5FbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGl0ZW1baV0uX3BhcmVudCA9IE93bmVyO1xyXG4gICAgICAgICAgICAgICAgaXRlbVtpXS5Mb2FkKCk7XHJcbiAgICAgICAgICAgICAgICBfY29udHJvbHMuQWRkKGl0ZW1baV0pOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfb3duZXIuRWxlbWVudC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkRvY3VtZW50RnJhZ21lbnQ+KGZyYWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ2xlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLypAXHJcblx0XHRcdHZhciBsZW4gPSBfb3duZXIuRWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcclxuXHRcdFx0d2hpbGUobGVuLS0pXHJcblx0XHRcdHtcclxuXHRcdFx0XHRfb3duZXIuRWxlbWVudC5yZW1vdmVDaGlsZChfb3duZXIuRWxlbWVudC5sYXN0Q2hpbGQpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHQqL1xyXG4gICAgICAgICAgICBfY29udHJvbHMuQ2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIENvbnRhaW5zKENvbnRyb2wgaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29udHJvbHMuQ29udGFpbnMoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDb3B5VG8oQ29udHJvbFtdIGFycmF5LCBpbnQgYXJyYXlJbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb250cm9scy5Db3B5VG8oYXJyYXksIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ29weVRvKEFycmF5IGFycmF5LCBpbnQgYXJyYXlJbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb250cm9scy5Db3B5VG8oKENvbnRyb2xbXSlhcnJheSwgYXJyYXlJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSUVudW1lcmF0b3I8Q29udHJvbD4gR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbnRyb2xzLkdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5kZXhPZihDb250cm9sIGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbnRyb2xzLkluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbnNlcnQoaW50IGluZGV4LCBDb250cm9sIGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfb3duZXIuRWxlbWVudC5pbnNlcnRCZWZvcmU8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRWxlbWVudD4oaXRlbS5FbGVtZW50LCBfb3duZXIuRWxlbWVudC5jaGlsZE5vZGVzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIF9jb250cm9scy5JbnNlcnQoaW5kZXgsIGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgUmVtb3ZlKENvbnRyb2wgaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9vd25lci5FbGVtZW50LnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEVsZW1lbnQ+KGl0ZW0uRWxlbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29udHJvbHMuUmVtb3ZlKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlQXQoaW50IGluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX293bmVyLkVsZW1lbnQucmVtb3ZlQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5Ob2RlPihfb3duZXIuRWxlbWVudC5jaGlsZE5vZGVzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIF9jb250cm9scy5SZW1vdmVBdChpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBJRW51bWVyYXRvciBJRW51bWVyYWJsZS5HZXRFbnVtZXJhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29udHJvbHMuR2V0RW51bWVyYXRvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uQ29tcG9uZW50TW9kZWw7XHJcbnVzaW5nIFN5c3RlbS5EYXRhO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLldpbmRvd3MuRm9ybXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERhdGFHcmlkVmlldyA6IENvbnRyb2wsIElTdXBwb3J0SW5pdGlhbGl6ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBEYXRhR3JpZFZpZXdDb2x1bW5IZWFkZXJzSGVpZ2h0U2l6ZU1vZGUgQ29sdW1uSGVhZGVyc0hlaWdodFNpemVNb2RlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgRGF0YUdyaWRWaWV3Q29sdW1uQ29sbGVjdGlvbiBDb2x1bW5zIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBEYXRhR3JpZFZpZXdSb3dDb2xsZWN0aW9uIFJvd3MgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIGludGVybmFsIFJldHlwZWQuZG9tLkhUTUxUYWJsZUVsZW1lbnQgdGFibGU7XHJcbiAgICAgICAgcHVibGljIERhdGFHcmlkVmlldygpIDogYmFzZShuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhYmxlID0gbmV3IFJldHlwZWQuZG9tLkhUTUxUYWJsZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgRWxlbWVudC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxUYWJsZUVsZW1lbnQ+KHRhYmxlKTtcclxuXHJcbiAgICAgICAgICAgIEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcclxuXHJcbiAgICAgICAgICAgIENvbHVtbnMgPSBuZXcgRGF0YUdyaWRWaWV3Q29sdW1uQ29sbGVjdGlvbih0aGlzLCB0YWJsZSk7XHJcbiAgICAgICAgICAgIFJvd3MgPSBuZXcgRGF0YUdyaWRWaWV3Um93Q29sbGVjdGlvbih0aGlzLCB0YWJsZSk7XHJcblxyXG4gICAgICAgICAgICBUYWJTdG9wID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBFbGVtZW50LnNldEF0dHJpYnV0ZShcInNjb3BlXCIsIFwidGFibGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBCZWdpbkluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbmRJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIG9iamVjdCBUYWdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfdGFnOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfdGFnID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RhZyBpcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ciA9IChfdGFnICsgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ci5Db250YWlucyhcIixcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJyeSA9IHN0ci5TcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbGVtZW50LmNsYXNzTmFtZSA9IGFycnlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJ5Lkxlbmd0aCA+PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5jbGFzc05hbWUgPSBhcnJ5WzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycnkuTGVuZ3RoID49IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29sdW1ucy5oZWFkZXIuY2xhc3NOYW1lID0gYXJyeVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb2x1bW5zLmhlYWRlci5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbHVtbnMuaGVhZGVyLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWxlbWVudC5jbGFzc05hbWUgPSBzdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbHVtbnMuaGVhZGVyLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIENvbHVtbnMuaGVhZGVyLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBPbk5ld1Jvd0V2ZW50KG9iamVjdCBzZW5kZXIsIE5ld1Jvd0V2ZW50QXJncyBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUm93cy5BZGQoYXJncy5Sb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvYmplY3QgZGF0YVNvdXJjZTtcclxuICAgICAgICBwdWJsaWMgb2JqZWN0IERhdGFTb3VyY2UgeyBnZXQgeyByZXR1cm4gZGF0YVNvdXJjZTsgfSBzZXQge1xyXG4gICAgICAgICAgICAgICAgaWYodmFsdWUgIT0gZGF0YVNvdXJjZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhU291cmNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhU291cmNlIGlzIERhdGFUYWJsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR0ID0gZGF0YVNvdXJjZS5BczxEYXRhVGFibGU+KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHQuTmV3Um93RXZlbnQgLT0gT25OZXdSb3dFdmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNvdXJjZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVNvdXJjZSAhPSBudWxsICYmIGRhdGFTb3VyY2UgaXMgRGF0YVRhYmxlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR0ID0gZGF0YVNvdXJjZS5BczxEYXRhVGFibGU+KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdC5OZXdSb3dFdmVudCArPSBPbk5ld1Jvd0V2ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5XaW5kb3dzLkZvcm1zXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBUT0RPIC0gYWRkIGNvbnRyb2xzIHZpYSBodG1sLi4uLlxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBEYXRhR3JpZFZpZXdDb2x1bW5Db2xsZWN0aW9uIDogSUxpc3Q8RGF0YUdyaWRWaWV3Q29sdW1uPiwgSUNvbGxlY3Rpb24sIElFbnVtZXJhYmxlXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgRGF0YUdyaWRWaWV3IF9vd25lcjtcclxuICAgICAgICBpbnRlcm5hbCBSZXR5cGVkLmRvbS5IVE1MVGFibGVTZWN0aW9uRWxlbWVudCBoZWFkZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEYXRhR3JpZFZpZXdDb2x1bW5Db2xsZWN0aW9uKERhdGFHcmlkVmlldyBvd25lciwgUmV0eXBlZC5kb20uSFRNTFRhYmxlRWxlbWVudCB0YWJsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9vd25lciA9IG93bmVyO1xyXG4gICAgICAgICAgICBfY29udHJvbHMgPSBuZXcgTGlzdDxEYXRhR3JpZFZpZXdDb2x1bW4+KCk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBoZWFkZXIgPSB0YWJsZS5jcmVhdGVUSGVhZCgpO1xyXG4gICAgICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxUYWJsZVNlY3Rpb25FbGVtZW50PihoZWFkZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERhdGFHcmlkVmlldyBPd25lciB7IGdldCB7IHJldHVybiBfb3duZXI7IH0gfVxyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8RGF0YUdyaWRWaWV3Q29sdW1uPiBfY29udHJvbHM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEYXRhR3JpZFZpZXdDb2x1bW4gdGhpc1tpbnQgaW5kZXhdIHsgZ2V0IHsgcmV0dXJuIF9jb250cm9sc1tpbmRleF07ICB9IHNldCB7XHJcbiAgICAgICAgICAgICAgICBfY29udHJvbHNbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IENvdW50IHsgZ2V0IHsgcmV0dXJuIF9jb250cm9scy5Db3VudDsgIH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc1JlYWRPbmx5IHsgZ2V0IHsgcmV0dXJuIGZhbHNlOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKERhdGFHcmlkVmlld0NvbHVtbiBpdGVtKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50PihpdGVtLkVsZW1lbnQpO1xyXG4gICAgICAgICAgICBfY29udHJvbHMuQWRkKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkUmFuZ2UoRGF0YUdyaWRWaWV3Q29sdW1uW10gaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtID09IG51bGwgfHwgaXRlbS5MZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGZyYWcgPSBSZXR5cGVkLmRvbS5kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaXRlbS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50PihpdGVtW2ldLkVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgX2NvbnRyb2xzLkFkZChpdGVtW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5Eb2N1bWVudEZyYWdtZW50PihmcmFnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENsZWFyKClcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qQFxyXG5cdFx0XHR2YXIgbGVuID0gaGVhZGVyLmNoaWxkTm9kZXMubGVuZ3RoO1xyXG5cdFx0XHR3aGlsZShsZW4tLSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGhlYWRlci5yZW1vdmVDaGlsZChoZWFkZXIubGFzdENoaWxkKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Ki9cclxuICAgICAgICAgICAgX2NvbnRyb2xzLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhEYXRhR3JpZFZpZXdDb2x1bW4gaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29udHJvbHMuQ29udGFpbnMoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDb3B5VG8oRGF0YUdyaWRWaWV3Q29sdW1uW10gYXJyYXksIGludCBhcnJheUluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRyb2xzLkNvcHlUbyhhcnJheSwgYXJyYXlJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDb3B5VG8oQXJyYXkgYXJyYXksIGludCBhcnJheUluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRyb2xzLkNvcHlUbygoRGF0YUdyaWRWaWV3Q29sdW1uW10pYXJyYXksIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElFbnVtZXJhdG9yPERhdGFHcmlkVmlld0NvbHVtbj4gR2V0RW51bWVyYXRvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbnRyb2xzLkdldEVudW1lcmF0b3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5kZXhPZihEYXRhR3JpZFZpZXdDb2x1bW4gaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29udHJvbHMuSW5kZXhPZihpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluc2VydChpbnQgaW5kZXgsIERhdGFHcmlkVmlld0NvbHVtbiBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGVhZGVyLmluc2VydEJlZm9yZTxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50PihpdGVtLkVsZW1lbnQsIGhlYWRlci5jaGlsZE5vZGVzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIF9jb250cm9scy5JbnNlcnQoaW5kZXgsIGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgUmVtb3ZlKERhdGFHcmlkVmlld0NvbHVtbiBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGVhZGVyLnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnQ+KGl0ZW0uRWxlbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29udHJvbHMuUmVtb3ZlKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlQXQoaW50IGluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaGVhZGVyLnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uTm9kZT4oaGVhZGVyLmNoaWxkTm9kZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgX2NvbnRyb2xzLlJlbW92ZUF0KGluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIElFbnVtZXJhdG9yIElFbnVtZXJhYmxlLkdldEVudW1lcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb250cm9scy5HZXRFbnVtZXJhdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkRhdGE7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uV2luZG93cy5Gb3Jtc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVE9ETyAtIGFkZCBjb250cm9scyB2aWEgaHRtbC4uLi5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgRGF0YUdyaWRWaWV3Um93Q29sbGVjdGlvbiA6IElMaXN0PERhdGFSb3c+LCBJQ29sbGVjdGlvbiwgSUVudW1lcmFibGVcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBEYXRhR3JpZFZpZXcgX293bmVyO1xyXG4gICAgICAgIGludGVybmFsIFJldHlwZWQuZG9tLkhUTUxUYWJsZVNlY3Rpb25FbGVtZW50IGJvZHk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBEYXRhR3JpZFZpZXdSb3dDb2xsZWN0aW9uKERhdGFHcmlkVmlldyBvd25lciwgUmV0eXBlZC5kb20uSFRNTFRhYmxlRWxlbWVudCB0YWJsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9vd25lciA9IG93bmVyO1xyXG4gICAgICAgICAgICBfY29udHJvbHMgPSBuZXcgTGlzdDxEYXRhUm93PigpO1xyXG5cclxuICAgICAgICAgICAgYm9keSA9IHRhYmxlLmNyZWF0ZVRCb2R5KCk7XHJcbiAgICAgICAgICAgIHRhYmxlLmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQ+KGJvZHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIERhdGFHcmlkVmlldyBPd25lciB7IGdldCB7IHJldHVybiBfb3duZXI7IH0gfVxyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8RGF0YVJvdz4gX2NvbnRyb2xzO1xyXG5cclxuICAgICAgICBwdWJsaWMgRGF0YVJvdyB0aGlzW2ludCBpbmRleF0geyBnZXQgeyByZXR1cm4gX2NvbnRyb2xzW2luZGV4XTsgIH0gc2V0IHtcclxuICAgICAgICAgICAgICAgIF9jb250cm9sc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgQ291bnQgeyBnZXQgeyByZXR1cm4gX2NvbnRyb2xzLkNvdW50OyAgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzUmVhZE9ubHkgeyBnZXQgeyByZXR1cm4gZmFsc2U7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoRGF0YVJvdyBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxUYWJsZVJvd0VsZW1lbnQ+KGl0ZW0uRWxlbWVudCk7XHJcbiAgICAgICAgICAgIF9jb250cm9scy5BZGQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRSYW5nZShEYXRhUm93W10gaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtID09IG51bGwgfHwgaXRlbS5MZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGZyYWcgPSBSZXR5cGVkLmRvbS5kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaXRlbS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxUYWJsZVJvd0VsZW1lbnQ+KGl0ZW1baV0uRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBfY29udHJvbHMuQWRkKGl0ZW1baV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5Eb2N1bWVudEZyYWdtZW50PihmcmFnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENsZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8qQFxyXG5cdFx0XHR2YXIgbGVuID0gYm9keS5jaGlsZE5vZGVzLmxlbmd0aDtcclxuXHRcdFx0d2hpbGUobGVuLS0pXHJcblx0XHRcdHtcclxuXHRcdFx0XHRib2R5LnJlbW92ZUNoaWxkKGJvZHkubGFzdENoaWxkKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Ki9cclxuICAgICAgICAgICAgX2NvbnRyb2xzLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb250YWlucyhEYXRhUm93IGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbnRyb2xzLkNvbnRhaW5zKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ29weVRvKERhdGFSb3dbXSBhcnJheSwgaW50IGFycmF5SW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udHJvbHMuQ29weVRvKGFycmF5LCBhcnJheUluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENvcHlUbyhBcnJheSBhcnJheSwgaW50IGFycmF5SW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udHJvbHMuQ29weVRvKChEYXRhUm93W10pYXJyYXksIGFycmF5SW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElFbnVtZXJhdG9yPERhdGFSb3c+IEdldEVudW1lcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb250cm9scy5HZXRFbnVtZXJhdG9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEluZGV4T2YoRGF0YVJvdyBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb250cm9scy5JbmRleE9mKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW5zZXJ0KGludCBpbmRleCwgRGF0YVJvdyBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYm9keS5pbnNlcnRCZWZvcmU8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MVGFibGVSb3dFbGVtZW50PihpdGVtLkVsZW1lbnQsIGJvZHkuY2hpbGROb2Rlc1tpbmRleF0pO1xyXG4gICAgICAgICAgICBfY29udHJvbHMuSW5zZXJ0KGluZGV4LCBpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFJlbW92ZShEYXRhUm93IGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib2R5LnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTFRhYmxlUm93RWxlbWVudD4oaXRlbS5FbGVtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb250cm9scy5SZW1vdmUoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVBdChpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBib2R5LnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uTm9kZT4oYm9keS5jaGlsZE5vZGVzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIF9jb250cm9scy5SZW1vdmVBdChpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBJRW51bWVyYXRvciBJRW51bWVyYWJsZS5HZXRFbnVtZXJhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29udHJvbHMuR2V0RW51bWVyYXRvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLldpbmRvd3MuRm9ybXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdyb3VwQm94IDogQ29udHJvbFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQgbGVnZW5kO1xyXG4gICAgICAgIHByaXZhdGUgUGFuZWwgcGFuZWw7XHJcbiAgICAgICAgcHVibGljIEdyb3VwQm94KCkgOiBiYXNlKG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGFuZWwgPSBuZXcgUGFuZWwoKTtcclxuXHJcbiAgICAgICAgICAgIEVsZW1lbnQuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4obGVnZW5kID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBFbGVtZW50LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEVsZW1lbnQ+KHBhbmVsLkVsZW1lbnQpO1xyXG4gICAgICAgICAgICBwYW5lbC5FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xyXG4gICAgICAgICAgICBDb250cm9scy5fb3duZXIgPSBwYW5lbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVGV4dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIGxlZ2VuZC50ZXh0Q29udGVudDsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmFzZS5UZXh0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBsZWdlbmQudGV4dENvbnRlbnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIG9iamVjdCBUYWdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfdGFnOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfdGFnID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RhZyBpcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ciA9IChfdGFnICsgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ci5Db250YWlucyhcIixcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJyeSA9IHN0ci5TcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbGVtZW50LmNsYXNzTmFtZSA9IGFycnlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJ5Lkxlbmd0aCA9PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmQuY2xhc3NOYW1lID0gYXJyeVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsLkVsZW1lbnQuY2xhc3NOYW1lID0gYXJyeVsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2VuZC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwuRWxlbWVudC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVsZW1lbnQuY2xhc3NOYW1lID0gc3RyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmQuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFuZWwuRWxlbWVudC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50LmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVnZW5kLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZWwuRWxlbWVudC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uV2luZG93cy5Gb3Jtc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTGFiZWwgOiBDb250cm9sXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExhYmVsKCkgOiBiYXNlKG5ldyBSZXR5cGVkLmRvbS5IVE1MU3BhbkVsZW1lbnQoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRhYlN0b3AgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVGV4dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIEVsZW1lbnQudGV4dENvbnRlbnQ7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhc2UuVGV4dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgRWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW0uV2luZG93cy5Gb3Jtc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTGlua0xhYmVsIDogQ29udHJvbFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBMaW5rTGFiZWwoKSA6IGJhc2UobmV3IFJldHlwZWQuZG9tLkhUTUxBbmNob3JFbGVtZW50KCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUYWJTdG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vRWxlbWVudC5BczxIVE1MQW5jaG9yRWxlbWVudD4oKS5IcmVmID0gXCIjXCI7XHJcbiAgICAgICAgICAgIEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRleHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBFbGVtZW50LnRleHRDb250ZW50OyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXNlLlRleHQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIEVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgT25DbGljayhFdmVudEFyZ3MgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25DbGljayhlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChMaW5rQ2xpY2tlZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgTGlua0NsaWNrZWQodGhpcywgbmV3IExpbmtMYWJlbExpbmtDbGlja2VkRXZlbnRBcmdzKG51bGwpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBldmVudCBMaW5rTGFiZWxMaW5rQ2xpY2tlZEV2ZW50SGFuZGxlciBMaW5rQ2xpY2tlZDtcclxuXHJcbiAgICAgICAgcHVibGljIGNsYXNzIExpbmtcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uRHJhd2luZztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5XaW5kb3dzLkZvcm1zXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9ncmVzc0JhciA6IENvbnRyb2xcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCBwcm9ncmVzc0JhcjtcclxuICAgICAgICBwdWJsaWMgUHJvZ3Jlc3NCYXIoKSA6IGJhc2UobmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbGVtZW50LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHByb2dyZXNzQmFyID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBUYWJTdG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEVsZW1lbnQuc2V0QXR0cmlidXRlKFwic2NvcGVcIiwgXCJwcm9ncmVzc1wiKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIENvbG9yIEZvcmVDb2xvciB7IGdldCB7IHJldHVybiBiYXNlLkZvcmVDb2xvcjsgfSBzZXQge1xyXG4gICAgICAgICAgICAgICAgYmFzZS5Gb3JlQ29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmKF9pbml0KVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHZhbHVlLlRvSHRtbCgpO1xyXG4gICAgICAgICAgICB9IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX3ZhbHVlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgVmFsdWUgeyBnZXQgeyByZXR1cm4gX3ZhbHVlOyB9ICBzZXQge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMClcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiAxMDApXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICBfdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmKF9pbml0KVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gX3ZhbHVlICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgb2JqZWN0IFRhZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF90YWc7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF90YWcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGFnIGlzIHN0cmluZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gKF90YWcgKyBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyLkNvbnRhaW5zKFwiLFwiKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcnJ5ID0gc3RyLlNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVsZW1lbnQuY2xhc3NOYW1lID0gYXJyeVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycnkuTGVuZ3RoID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLmNsYXNzTmFtZSA9IGFycnlbMV07ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuY2xhc3NOYW1lID0gXCJcIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWxlbWVudC5jbGFzc05hbWUgPSBzdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnQuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbiNpZiAhQlJJREdFXHJcbnVzaW5nIFN5c3RlbS5Db21wb25lbnRNb2RlbDtcclxudXNpbmcgU3lzdGVtLkRyYXdpbmc7XHJcbiNlbmRpZlxyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIFN5c3RlbS5XaW5kb3dzLkZvcm1zO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29tYm9Cb3hSZXNpemUgOiBDb21ib0JveFxyXG4gICAge1xyXG4jaWYgIUJSSURHRVxyXG4gICAgICAgIFtEZWZhdWx0VmFsdWUoZmFsc2UpXVxyXG4gICAgICAgIFtCcm93c2FibGUodHJ1ZSldXHJcbiNlbmRpZlxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEF1dG9TaXplXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQXV0b1NpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhc2UuQXV0b1NpemUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiNpZiAhQlJJREdFXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIFNpemUgTWluaW11bVNpemUgeyBnZXQgPT4gYmFzZS5NaW5pbXVtU2l6ZTsgc2V0ID0+IGJhc2UuTWluaW11bVNpemUgPSBiYXNlLlNpemU7IH1cclxuXHJcbiAgICAgICAgcHVibGljIENvbWJvQm94UmVzaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdNb2RlID0gU3lzdGVtLldpbmRvd3MuRm9ybXMuRHJhd01vZGUuT3duZXJEcmF3VmFyaWFibGU7XHJcbiAgICAgICAgICAgIEF1dG9TaXplID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4jZW5kaWZcclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuI2lmICFCUklER0VcclxudXNpbmcgU3lzdGVtLkNvbXBvbmVudE1vZGVsO1xyXG4jZW5kaWZcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBTeXN0ZW0uV2luZG93cy5Gb3JtcztcclxuXHJcbm5hbWVzcGFjZSBTeXN0ZW1cclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHRCb3hSZXNpemUgOiBUZXh0Qm94XHJcbiAgICB7XHJcbiNpZiAhQlJJREdFXHJcbiAgICAgICAgW0RlZmF1bHRWYWx1ZSh0cnVlKV1cclxuICAgICAgICBbQnJvd3NhYmxlKHRydWUpXVxyXG4jZW5kaWZcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBBdXRvU2l6ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkF1dG9TaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBiYXNlLkF1dG9TaXplID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0Qm94UmVzaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEF1dG9TaXplID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLldpbmRvd3MuRm9ybXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJ1dHRvbiA6IEJ1dHRvbkJhc2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQnV0dG9uKCkgOiBiYXNlKG5ldyBSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudCgpKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5XaW5kb3dzLkZvcm1zXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDaGVja0JveCA6IEJ1dHRvbkJhc2VcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnQgY2hlY2tCb3g7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50IHRleHQ7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGNoZWNrYm94VG9MYWJlbElkO1xyXG4gICAgICAgIHB1YmxpYyBDaGVja0JveCgpIDogYmFzZShuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IGNoZWNrYm94VG9MYWJlbElkKys7XHJcbiAgICAgICAgICAgIHZhciBpZHMgPSBcIl9fY2hlY2tcIiArIGlkLlRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIEVsZW1lbnQuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PigoY2hlY2tCb3ggPSBuZXcgUmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudCgpIHsgdHlwZSA9IFwiY2hlY2tib3hcIiwgaWQgPSBpZHMgfSkpO1xyXG4gICAgICAgICAgICBFbGVtZW50LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4odGV4dCA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50KCkgeyBodG1sRm9yID0gaWRzIH0pO1xyXG5cclxuICAgICAgICAgICAgY2hlY2tCb3guc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIHRleHQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDaGVja2VkIHsgZ2V0IHsgcmV0dXJuIGNoZWNrQm94LkBjaGVja2VkOyB9IHNldCB7IGNoZWNrQm94LkBjaGVja2VkID0gdmFsdWU7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRleHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiB0ZXh0LnRleHRDb250ZW50OyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBvYmplY3QgVGFnXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX3RhZzsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3RhZyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90YWcgaXMgc3RyaW5nKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSAoX3RhZyArIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0ci5Db250YWlucyhcIixcIikpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJyeSA9IHN0ci5TcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbGVtZW50LmNsYXNzTmFtZSA9IGFycnlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFycnkuTGVuZ3RoID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQm94LmNsYXNzTmFtZSA9IGFycnlbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9IGFycnlbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0JveC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbGVtZW50LmNsYXNzTmFtZSA9IHN0cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tCb3guY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnQuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0JveC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBUYWJJbmRleFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF90YWJJbmRleDsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoX2luaXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RhYkluZGV4ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFRhYlN0b3ApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0JveC50YWJJbmRleCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0JveC5yZW1vdmVBdHRyaWJ1dGUoXCJUYWJJbmRleFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5EcmF3aW5nO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgU3lzdGVtLldpbmRvd3MuRm9ybXNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEZvcm0gOiBDb250YWluZXJDb250cm9sXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IEZvcm1Ub3BCb3JkZXIgPSAyNztcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnQgRm9ybUJvdHRvbkJvcmRlciA9IDY7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IEZvcm1MZWZ0Qm9yZGVyID0gNjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnQgRm9ybVJpZ2h0Qm9yZGVyID0gNjtcclxuXHJcbiAgICAgICAgcHVibGljIEZvcm0oKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmFja0NvbG9yID0gU3lzdGVtQ29sb3JzLkNvbnRyb2w7XHJcbiAgICAgICAgICAgIEVsZW1lbnQuc3R5bGUuYm9yZGVyVG9wID0gXCJzb2xpZCBcIiArIEZvcm1Ub3BCb3JkZXIgKyBcInB4XCIgKyBcIiBcIiArIENvbG9yLkNvcm5mbG93ZXJCbHVlO1xyXG4gICAgICAgICAgICBFbGVtZW50LnN0eWxlLmJvcmRlckJvdHRvbSA9IFwic29saWQgXCIgKyBGb3JtQm90dG9uQm9yZGVyICsgXCJweFwiICsgXCIgXCIgKyBDb2xvci5Db3JuZmxvd2VyQmx1ZTtcclxuXHJcbiAgICAgICAgICAgIEVsZW1lbnQuc3R5bGUuYm9yZGVyTGVmdCA9IFwic29saWQgXCIgKyBGb3JtTGVmdEJvcmRlciArIFwicHhcIiArIFwiIFwiICsgQ29sb3IuQ29ybmZsb3dlckJsdWU7XHJcbiAgICAgICAgICAgIEVsZW1lbnQuc3R5bGUuYm9yZGVyUmlnaHQgPSBcInNvbGlkIFwiICsgRm9ybVJpZ2h0Qm9yZGVyICsgXCJweFwiICsgXCIgXCIgKyBDb2xvci5Db3JuZmxvd2VyQmx1ZTtcclxuXHJcbiAgICAgICAgICAgIFRhYlN0b3AgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBGb250IEZvbnQgeyBnZXQgeyByZXR1cm4gYmFzZS5Gb250OyB9IHNldCB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYmFzZS5Gb250ID0gdmFsdWU7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IH0gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFNpemUgR2V0Q2xpZW50U2l6ZShTaXplIHNpemUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNpemUoc2l6ZS5XaWR0aCAtIChGb3JtTGVmdEJvcmRlciArIEZvcm1SaWdodEJvcmRlciksIHNpemUuSGVpZ2h0IC0gKEZvcm1Ub3BCb3JkZXIgKyBGb3JtQm90dG9uQm9yZGVyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFNpemUgU2V0U2l6ZShTaXplIGNsaWVudFNpemUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNpemUoY2xpZW50U2l6ZS5XaWR0aCArIChGb3JtTGVmdEJvcmRlciArIEZvcm1SaWdodEJvcmRlciksIGNsaWVudFNpemUuSGVpZ2h0ICsgKEZvcm1Ub3BCb3JkZXIgKyBGb3JtQm90dG9uQm9yZGVyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIERpc3Bvc2UoYm9vbCBkaXNwb3NpbmcpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTEVsZW1lbnQ+KEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBTaXplIENsaWVudFNpemUgeyBnZXQgeyByZXR1cm4gR2V0Q2xpZW50U2l6ZShTaXplKTsgfSBzZXQgeyBTaXplID0gU2V0U2l6ZSh2YWx1ZSk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVGV4dCB7IGdldDsgc2V0OyB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFN5c3RlbS5XaW5kb3dzLkZvcm1zXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQYW5lbCA6IENvbnRhaW5lckNvbnRyb2xcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgUGFuZWwoKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFiU3RvcCA9IGZhbHNlO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdCn0K