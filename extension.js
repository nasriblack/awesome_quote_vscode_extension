
const vscode = require('vscode');

let intervalId;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const quotes = [
		"The only way to do great work is to love what you do. - Steve Jobs",
		"Life is what happens when you're busy making other plans. - John Lennon",
		"The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
		// Add more quotes here
	];
	function showQuote() {
		const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Quote of the moment",
			cancellable: false
		}, (progress, token) => {
			return new Promise((resolve) => {
				let increment = 0;
				const intervalTime = 100;
				const totalTime = 10000;
				const incrementStep = 100 / (totalTime / intervalTime);

				const updateProgress = setInterval(() => {
					increment += incrementStep;
					progress.report({
						increment: incrementStep,
						message: `${randomQuote} (${Math.min(Math.round(increment), 100)}%)`
					});

					if (increment >= 100) {
						clearInterval(updateProgress);
						resolve();
					}
				}, intervalTime);
			});
		});
	}


	intervalId = setInterval(showQuote, 1 * 60 * 1000);
	const disposable = vscode.commands.registerCommand('quotesword.helloWorld', showQuote);

	context.subscriptions.push(disposable);
}
function deactivate() {
	if (intervalId) {
		clearInterval(intervalId);
	}
}

module.exports = {
	activate,
	deactivate
}
