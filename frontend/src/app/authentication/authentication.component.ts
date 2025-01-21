import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UpdateUsername } from '../actions/user.actions';
import { ApiService } from '../api.service';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserState } from '../states/user.states';

@Component({
  selector: 'app-authentication',
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit {
    pass = '';
    login = '';
    isRegisterMode = false;
    isAuthenticated = false; // Track authentication state
    displayUsername$: Observable<string>;

    ngOnInit(): void {
        // Check if the user is already authenticated
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            this.apiService.getCurrentUser().subscribe(
                (user: any) => {
                    this.isAuthenticated = true;
                    this.store.dispatch(new UpdateUsername(user.login));
                },
                (error) => {
                    console.error('Error loading user info:', error)
                }
            );
        }
    }

    constructor(private apiService: ApiService, private store: Store) {
        this.displayUsername$ = this.store.select(UserState.getUsername);
    }

    toggleMode() {
        this.isRegisterMode = !this.isRegisterMode;
    }

    authenticate() {
        if (this.isRegisterMode) {
            this.apiService.register(this.login, this.pass).subscribe(
                (response) => {
                    console.log('Registered:', response);
                    alert('Registration successful! Please log in.');
                    this.toggleMode();
                },
                (error) => console.error('Error:', error)
            );
        }
        else {
            this.apiService.login(this.login, this.pass).subscribe(
                (response: any) => {
                    console.log('Logged in:', response);
                    this.isAuthenticated = true;
                    console.log('User login:', response.login);
                    this.store.dispatch(new UpdateUsername(response.login));
                    // put the access token in the local storage
                    localStorage.setItem('accessToken', response.accessToken.accessToken);
                },
                (error) => {
                    console.error('Error:', error);
                    switch (error.status) {
                        case 401:
                            alert('Login or password incorrect');
                            break;
                        default:
                            alert('An error occurred, bruh moment');
                    }
                }
            );
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.pass = '';
        this.login = '';
        this.store.dispatch(new UpdateUsername(''));
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('You have been logged out.');
    }
}
