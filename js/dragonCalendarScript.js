(function($) {
    $(function() {

        class DragonCalendar {
            constructor(data) {

                this.data = new Date(data),
                    this.startWeek = 0,
                    this.endWeek = 7,
                    this.colorSunday = 'bg-danger',
                    this.str = '',
                    this.element = 'days',
                    this.year = this.data.getFullYear(),
                    this.month = this.data.getMonth(),
                    this.qtyDayInMonth = new Date(this.year, this.month + 1, 0).getDate(),
                    this.firstDay = new Date(this.year, this.month, 1).getDay(),
                    this.lastDay = new Date(this.year, this.month, this.qtyDayInMonth).getDay(),
                    this.todayDay = this.data.getDate(),                    
                    this.renderView(),
                    this.today()
            }
            makeView() {
                this.str = '';
                this.str += "<div class='days-wrap '>";

                for (let i = 1; i <= this.qtyDayInMonth; i++) {
                    //открытие строки дней недели (7)
                    if (!this.startWeek) {
                        this.str += "<div class='tr d-flex m-1 justify-content-around text-center'>";
                    }
                    // если первый день месяца не воскресенье, то добавляет пустые td чтобы числа совпадали с днями недели
                    if (this.firstDay != 0) {
                        for (let h = 0; h < this.firstDay; h++) {
                            this.str += "<div class='day bg-light height mb radius'></div>";
                            this.startWeek++;
                        }
                        this.firstDay = 0;
                    }

                    this.str += '<div class=" day bg-info height mb radius">' + i + '</div>';
                    this.startWeek++;


                    // при заполнении 7 td закрывается строка и переходит на новую неделю
                    if (this.startWeek == this.endWeek) {
                        this.str += '</div>';
                        this.startWeek = 0;
                    }

                }
                // добавление пустых блоков до конца строки(недели)
                if (this.lastDay < 6) {
                    for (let a = 1; a <= (6 - this.lastDay); a++) {
                        this.str += "<div class='day bg-light height mb radius'></div>";
                    }
                    this.str += "</div>";
                }


                this.str += '</div>';
                return this.str;
            }


            renderView() {
                $(`#${this.element}`).html('').html(this.makeView());
                $(".tr div:first-child").addClass(`${this.colorSunday}`);
                $('#nameMonth').attr('data-month', this.month + 1).attr('data-year', this.year).html(this.data.toLocaleString('default', { month: 'long' }) + ' ' + this.year);

            }

            today() {
                let temp = new Date();
                let realTime = temp.getDate();
                let realYear = temp.getFullYear();
                let realMonth = temp.getMonth();
                if(realMonth == this.month && realYear == this.year){
                    this.todayDay = realTime;
                }
             
                let q = document.querySelectorAll('.day');
                for (let r = 0; r < q.length; r++) {
                    if ( $(q[r]).text() == this.todayDay ) {
                        $(q[r]).css('border','3px solid blue').addClass('bg-warning');
                        break;
                    }
                }
            }
        }

      new DragonCalendar(new Date());
        let yearFrom = $('#nameMonth').data('year');
        let monthFrom = $('#nameMonth').data('month');


        function ahotherMonth(year, month) {
           
            return new DragonCalendar(`${year}-${month}`);
        }


        $('#calendar').on('click', 'p', function(e) {

            ($(this).attr('id') == 'back') ? monthFrom-- : monthFrom++;

            if (monthFrom == 0) {
                monthFrom = 12;
                yearFrom -= 1;
            }
            if (monthFrom == 13) {
                monthFrom = 1;
                yearFrom += 1;
            }

           ahotherMonth(yearFrom, monthFrom);
            
        })






















    })
})(jQuery)