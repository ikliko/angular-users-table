import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '@shared/models/user.model';

const MOCK_DATA: any[] = [
  {
    'id': 1,
    'fname': 'Bearnard',
    'lname': 'Slemmonds',
    'email_address': 'bslemmonds0@godaddy.com',
    'gender': 'Male',
    'mobile': '9832110910',
    'birthdate': '2000-06-16'
  },
  {
    'id': 2,
    'fname': 'Thorstein',
    'lname': 'Everington',
    'email_address': 'teverington1@phpbb.com',
    'gender': 'Male',
    'mobile': '7278975347',
    'birthdate': '1998-01-26'
  },
  {
    'id': 3,
    'fname': 'Marius',
    'lname': 'Matkovic',
    'email_address': 'mmatkovic2@diigo.com',
    'gender': 'Male',
    'mobile': '8349424973',
    'birthdate': '1996-12-06'
  },
  {
    'id': 4,
    'fname': 'Joyous',
    'lname': 'Gasken',
    'email_address': 'jgasken3@angelfire.com',
    'gender': 'Female',
    'mobile': '2433242315',
    'birthdate': '1986-04-05'
  },
  {
    'id': 5,
    'fname': 'Babbie',
    'lname': 'Robuchon',
    'email_address': 'brobuchon4@twitpic.com',
    'gender': 'Female',
    'mobile': '7235156898',
    'birthdate': '1999-04-21'
  },
  {
    'id': 6,
    'fname': 'Clerc',
    'lname': 'Kitchingman',
    'email_address': 'ckitchingman5@ebay.co.uk',
    'gender': 'Male',
    'mobile': '9275888761',
    'birthdate': '1997-10-17'
  },
  {
    'id': 7,
    'fname': 'Gabriel',
    'lname': 'Castelin',
    'email_address': 'gcastelin6@geocities.jp',
    'gender': 'Male',
    'mobile': null,
    'birthdate': '1988-02-01'
  },
  {
    'id': 8,
    'fname': 'Deeyn',
    'lname': 'Taggett',
    'email_address': 'dtaggett7@si.edu',
    'gender': 'Female',
    'mobile': '8813685169',
    'birthdate': '1988-04-05'
  },
  {
    'id': 9,
    'fname': 'Wally',
    'lname': 'Louedey',
    'email_address': 'wlouedey8@examiner.com',
    'gender': 'Male',
    'mobile': '5362762145',
    'birthdate': '1987-12-08'
  },
  {
    'id': 10,
    'fname': 'Riki',
    'lname': 'Bate',
    'email_address': 'rbate9@economist.com',
    'gender': 'Female',
    'mobile': '1524024984',
    'birthdate': '1993-10-24'
  },
  {
    'id': 11,
    'fname': 'Janetta',
    'lname': 'Wildbore',
    'email_address': 'jwildborea@google.ca',
    'gender': 'Female',
    'mobile': '8296771600',
    'birthdate': '1987-03-14'
  },
  {
    'id': 12,
    'fname': 'Claudianus',
    'lname': 'Dumphry',
    'email_address': 'cdumphryb@oaic.gov.au',
    'gender': 'Male',
    'mobile': '3485033203',
    'birthdate': '1997-08-07'
  },
  {
    'id': 13,
    'fname': 'Cindra',
    'lname': 'Kepling',
    'email_address': 'ckeplingc@acquirethisname.com',
    'gender': 'Female',
    'mobile': '8041548897',
    'birthdate': '1994-08-22'
  },
  {
    'id': 14,
    'fname': 'Putnem',
    'lname': 'Fuggles',
    'email_address': 'pfugglesd@lycos.com',
    'gender': 'Male',
    'mobile': '8556297306',
    'birthdate': '1997-06-06'
  },
  {
    'id': 15,
    'fname': 'Isiahi',
    'lname': 'Seamark',
    'email_address': 'iseamarke@netvibes.com',
    'gender': 'Male',
    'mobile': '2516302118',
    'birthdate': '1986-04-12'
  },
  {
    'id': 16,
    'fname': 'Stephanus',
    'lname': 'Espadate',
    'email_address': 'sespadatef@zimbio.com',
    'gender': 'Male',
    'mobile': '7298428084',
    'birthdate': '1989-10-21'
  },
  {
    'id': 17,
    'fname': 'Carmelle',
    'lname': 'McGloin',
    'email_address': 'cmcgloing@weather.com',
    'gender': 'Female',
    'mobile': '4121085897',
    'birthdate': '1988-02-25'
  },
  {
    'id': 18,
    'fname': 'Raychel',
    'lname': 'Tersay',
    'email_address': 'rtersayh@furl.net',
    'gender': 'Female',
    'mobile': '4193595402',
    'birthdate': '1991-08-22'
  },
  {
    'id': 19,
    'fname': 'Madelaine',
    'lname': 'Bannon',
    'email_address': 'mbannoni@chron.com',
    'gender': 'Female',
    'mobile': '7115016153',
    'birthdate': '1993-04-04'
  },
  {
    'id': 20,
    'fname': 'Starlin',
    'lname': 'Skellorne',
    'email_address': 'sskellornej@zdnet.com',
    'gender': 'Female',
    'mobile': '1497184296',
    'birthdate': '1997-05-30'
  },
  {
    'id': 21,
    'fname': 'Emalia',
    'lname': 'Viger',
    'email_address': 'evigerk@prnewswire.com',
    'gender': 'Female',
    'mobile': '3506017063',
    'birthdate': '1995-09-01'
  },
  {
    'id': 22,
    'fname': 'Westley',
    'lname': 'Clay',
    'email_address': 'wclayl@netscape.com',
    'gender': 'Male',
    'mobile': '6619660109',
    'birthdate': '1987-05-19'
  },
  {
    'id': 23,
    'fname': 'Kandy',
    'lname': 'Duester',
    'email_address': 'kduesterm@ftc.gov',
    'gender': 'Female',
    'mobile': '3481874740',
    'birthdate': '1987-02-11'
  },
  {
    'id': 24,
    'fname': 'Devin',
    'lname': 'Mavin',
    'email_address': 'dmavinn@cmu.edu',
    'gender': 'Female',
    'mobile': '1337492907',
    'birthdate': '1986-12-26'
  },
  {
    'id': 25,
    'fname': 'Edd',
    'lname': 'Hanna',
    'email_address': 'ehannao@zimbio.com',
    'gender': 'Male',
    'mobile': '4791309002',
    'birthdate': '1989-03-25'
  },
  {
    'id': 26,
    'fname': 'Lorrin',
    'lname': 'Mawby',
    'email_address': 'lmawbyp@trellian.com',
    'gender': 'Female',
    'mobile': '4199684278',
    'birthdate': '1996-11-28'
  },
  {
    'id': 27,
    'fname': 'Barty',
    'lname': 'Matusov',
    'email_address': 'bmatusovq@cocolog-nifty.com',
    'gender': 'Male',
    'mobile': '7488603852',
    'birthdate': '2000-04-30'
  },
  {
    'id': 28,
    'fname': 'Hinda',
    'lname': 'Barrass',
    'email_address': 'hbarrassr@sogou.com',
    'gender': 'Female',
    'mobile': '8926732081',
    'birthdate': '1985-08-13'
  },
  {
    'id': 29,
    'fname': 'Nickola',
    'lname': 'Vasyaev',
    'email_address': 'nvasyaevs@deliciousdays.com',
    'gender': 'Male',
    'mobile': '9642275763',
    'birthdate': '1991-01-28'
  },
  {
    'id': 30,
    'fname': 'Ad',
    'lname': 'Craister',
    'email_address': 'acraistert@psu.edu',
    'gender': 'Male',
    'mobile': '3054628690',
    'birthdate': '1990-01-09'
  }
];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public getAllUsers(): Observable<User[]> {
    return of(MOCK_DATA.map((user: any) => this.parseUser(user)));
  }

  private parseUser(user: any): User {
    return {
      id: user.id,
      first_name: user.fname,
      last_name: user.lname,
      email: user.email_address,
      phone: user.mobile,
      birth_date: this.parseUserBirthDate(user.birthdate)
    }
  }

  private parseUserBirthDate(birthdate: string): string {
    if (!birthdate) {
      return '';
    }

    const bdateEntities = birthdate.split('-');

    if (bdateEntities.length < 3) {
      return '';
    }

    const year = bdateEntities[0];
    const month = bdateEntities[1];
    const day = bdateEntities[2];

    return `${day}/${month}/${year}`;
  }
}
