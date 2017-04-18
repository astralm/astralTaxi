import React from 'react';

export default React.createClass({
	render: function(){
		return <div data-role="page" id="autorization" className="il white inner-form ui-page ui-page-theme-a ui-page-active" data-url="autorization" tabIndex="0">
		    <div data-role="content" style={{padding: "0px", height: "1060px"}} className="ui-content" role="main">
		        <div className="autorization">
		            <div className="autorization-wrapper">
		                <h3>Авторизация</h3>
		                <span className="sub">Введите E-mail</span>
		                <form className="form_auth form_auth_user">
		                    <div className="autorization-input">
		                        <div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" placeholder="+7" /></div>
		                    </div>
		                    <div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" placeholder="Номер телефона" className="tel_auth" id="tel_auth" /></div>
		                    <a href="#" className="btn btn-warning btn_auth_fl disabled waves-effect waves-light ui-link">Продолжить</a>
		                    <div className="check-doc">
		                        <div className="check-doc__span">Нажимая продолжить вы подтверждаете своё согласие на обработку личных данных приложением и ознакомлены с правилами использования приложения.</div>
		                        <a href="" className="rules ui-link">Правила использования</a>
		                    </div>
		                </form>
		            </div>

		        </div>
		        <div className="long_btns">
		            <a href="" className="long_btn long_btn__blue ui-link">
		                <div><img src="img/face.png" alt="f" /></div>
		                <span>ВОЙТИ ЧЕРЕЗ FACEBOOK</span>
		            </a>
		            <a href="" className="long_btn long_btn__red ui-link">
		                <div><img src="img/g+.png" alt="g" /></div>
		                <span>ВОЙТИ ЧЕРЕЗ GOOGLE</span>
		            </a>
		        </div>
		    </div>
		</div>
	}
});