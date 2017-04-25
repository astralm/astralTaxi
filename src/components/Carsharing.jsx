import React from 'react';

export const Carsharing = React.createClass({
	render: function(){
		return <div data-role="page" id="karchering" className="il white ui-page ui-page-theme-a ui-page-active" data-url="karchering" tabIndex="0">
		    <div data-role="content" style={{padding: 0, height: "100vh"}} className="ui-content" role="main">
		        <div className="title">
		            <a href="#main" className="esc ui-link">
		                <span>Пропустить</span>
		                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAAvElEQVQ4T63TQQrCMBAF0PxBN6IbT5KQCxT0POLC7lSw7t0oXsO1u54gpfcx/RJRKaVI2pr1zAv5M4GKPEmSjPI8f7SVI8aw1k689zeS97IsT82eWGRcVdUewJbkqiiKcx2KQj4NxpgdgKwJdUIC1gZ1RgKktd6IyFEplTrnLniHdgUwjwk51JD0IrIgOSO57o0opZYApi8k9vZ6ndY6FZHs+5yuyOBgjTFhVw69RmytHb5sf1n7kNuvD/gElnd5DYJdGS0AAAAASUVORK5CYII=" alt="go" />
		            </a>
		        </div>
		        <div className="karchering-main">
		            <h3>Каршеринг</h3>
		            <p>В приложении Followay у вас есть возможность использовать каршеринг сервисы, однако, для этого необходимо предоставить соответствующие документы, такие как водительские права и паспорт.</p>
		            <a href="#karchering" className="btn btn-warning waves-effect waves-light ui-link" btn_auth="">ПОДКЛЮЧИТЬ КАРШЕРИНГ</a>
		            <p className="confirm">Нажимая подключить вы подтверждаете своё согласие на обработку личных данных приложением и ознакомлены с правилами использования приложения.</p>
		            <div className="rules">Что такое каршеринг?</div>
		            <div className="rules">Правила использования</div>
		        </div>
		    </div>
		</div>
	}
})