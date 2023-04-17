import { useEffect, useState } from "react";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faDivide } from "@fortawesome/free-solid-svg-icons";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { faEquals } from "@fortawesome/free-solid-svg-icons";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

function Calculator() {
	const [equation, setEquation] = useState<string>("");

	const numKeys: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
	const operators: string[] = ["+", "-", "/", "*", "."];
	const operatorIcons: Record<string, any> = {
		"+": faPlus,
		"-": faMinus,
		"/": faDivide,
		"*": faMultiply,
	};

	const addToEquation = (n: string): void => setEquation(equation + n);
	const backspace = (): void => setEquation(String(equation).slice(0, -1));
	const clear = (): void => setEquation("");
	const solve = (): void =>
		setEquation(equation.length >= 1 ? eval(equation) : "");

	const keyboardHandler = (event: KeyboardEvent): void => {
		const key: string = event.key,
			validKeys = numKeys.concat(operators);

		switch (true) {
			case validKeys.includes(key):
				addToEquation(key);
				break;
			case key === "Enter":
				solve();
				break;
			case key === "Backspace":
				backspace();
				break;
			case key === "Delete":
				clear();
				break;
			default:
				break;
		}

		console.log(equation);
	};

	useEffect(() => {
		window.addEventListener("keydown", keyboardHandler);
		return () => {
			window.removeEventListener("keydown", keyboardHandler);
		};
	}, [keyboardHandler]);

	return (
		<div className='body'>
			<input type='text' className='display' value={equation} readOnly />
			<div className='buttons'>
				<div className='numberButtons'>
					<button className='del' onClick={backspace}>
						<FontAwesomeIcon icon={faDeleteLeft} />
					</button>
					<button className='clear' onClick={clear}>
						Clear
					</button>
					{numKeys.map((n: string, index: number) => (
						<button key={index} onClick={() => addToEquation(n)}>
							{n}
						</button>
					))}

					<button className='equal' onClick={solve}>
						<FontAwesomeIcon icon={faEquals} />
					</button>
				</div>
				<div className='operators'>
					{operators.map((n: string, index: number) => (
						<button key={index} onClick={() => addToEquation(n)}>
							{operatorIcons[n] ? (
								<FontAwesomeIcon icon={operatorIcons[n]} />
							) : (
								"."
							)}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default Calculator;
