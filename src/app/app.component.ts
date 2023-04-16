import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
// hiểu tất cả đoan code trên là hiểu 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user!: { firstName: string; lastName: string };
  welcome!: string;
  usernameLabel!: string;
  passwordLabel!: string;
  lang = true;
  langSubscription!: Subscription;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'klingon', 'vi']);
    translate.use('en');
  }

  ngOnInit() {
    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      console.log("con chó")
      if (this.lang) {
        this.translate.use('en');
      } else {
        this.translate.use('vi');
      }
    });

    // hardcoded example
    this.user = { firstName: 'Sammy', lastName: 'Shark' };
    this.updateLabels();
  }
  // Nhờ vào cái này và cái Subscription được gọi hãy hiểu rõ nó để áp dụng vào dự án
  switchLanguage() {
    // Thử bỏ hết code như thế này đi và chỉ trừa thì khi vào function này this.translate.use('vi'); được chạy và nó sẽ chạy .subscribe
    // => Nếu ngôn ngữ thay đổi thì sẽ chạy function trong subscribe, mai hãy điều tra xem khi bỏ đi thì nó chạy subscribe 2 lần luôn chưa biết lý do
    // this.lang = !this.lang;
    // if (this.lang) {
    //   this.translate.use('en');
    // } else {
    //   this.translate.use('vi');
    // }
    // this.updateLabels();

    this.lang = !this.lang;
    if (this.lang) {
      this.translate.use('en');
    } else {
      this.translate.use('vi');
    }
    this.updateLabels();
  }

  updateLabels() {
    // synchronous. Also interpolate the 'firstName' parameter with a value.
    this.welcome = this.translate.instant('welcomeMessage', {
      firstName: this.user.firstName,
    });
    // asynchronous - gets translations then completes.
    this.translate
      .get(['login.username', 'login.password'])
      .subscribe((translations) => {
        this.usernameLabel = translations['login.username'];
        this.passwordLabel = translations['login.password'];
      });
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }
}