import { Controller } from '@hotwired/stimulus';

import $ from 'jquery'

import axios from "axios";

export default class extends Controller {
    static targets = [ "form", "name", "repeatPassword", "password" ];

    connect() {
        $(this.formTarget).on("submit", (e) => {
            e.preventDefault();
            let username = this.nameTarget.value;
            let password = this.passwordTarget.value;
            let repeatPassword = this.repeatPasswordTarget.value;
            axios.post('/register', {
                username: username,
                password: password,
                repeatPassword: repeatPassword
            }).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });

        })
    }
}