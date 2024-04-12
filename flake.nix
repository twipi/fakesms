{
	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
		flake-utils.url = "github:numtide/flake-utils";

		twipi = {
			url = "github:twipi/twipi";
			inputs.nixpkgs.follows = "nixpkgs";
			inputs.flake-utils.follows = "flake-utils";
		};
	};

	outputs = { self, nixpkgs, flake-utils, twipi }:
		flake-utils.lib.eachDefaultSystem (system: let
			pkgs = nixpkgs.legacyPackages.${system};
			lib  = pkgs.lib;

			twipiProto = "${twipi}/proto";
		in
		{
			devShells.default = pkgs.mkShell {
				packages = with pkgs; [
					nodejs
					go-task
					protobuf
				];

				PROTO_PATH = lib.makeSearchPath "proto" [
					twipi
				];

				# Manually set the Task temp directory to make Task create it.
				# See https://github.com/go-task/task/issues/1475.
				TASK_TEMP_DIR = ".task";

				shellHook = ''
					export PATH="$(git rev-parse --show-toplevel)/node_modules/.bin:$PATH"
				'';
			};
		});
}
