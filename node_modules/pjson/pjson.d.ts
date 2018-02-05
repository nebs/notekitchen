interface pjsonPerson {
    name : string;
    url : string;
    email : string;
}

declare module "pjson" {
    /**
     * The name of the package.
     */
    export var name : string;

    /**
     * Version must be parseable by node-semver, which is
     * bundled with npm as a dependency.
     */
    export var version : string;

    /**
     * This helps people discover your package, as it's
     * listed in 'npm search'.
     */
    export var description : string;

    /**
     * This helps people discover your package as it's
     * listed in 'npm search'.
     */
    export var keywords : string[];

    /**
     * The url to the project homepage.
     */
    export var homepage : string;

    /**
     * The url to your project's issue tracker and / or the email
     * address to which issues should be reported. These are
     * helpful for people who encounter issues with your package.
     */
    export var bugs : {

      /**
       * The url to your project's issue tracker.
       */
      url : string;

      /**
       * The email address to which issues should be reported.
       */
      email: string;
    };

    /**
     * You should specify a license for your package so that
     * people know how they are permitted to use it, and any
     * restrictions you're placing on it.
     */
    export var license : string;

    /**
     * A person who has been involved in creating or maintaining this package
     */
    export var author : pjsonPerson;

    /**
     * A list of people who contributed to this package.
     */
    export var contributors : pjsonPerson[];

    /**
     * A list of people who maintains this package.
     */
    export var maintainers : pjsonPerson[];

    /**
     * The 'files' field is an array of files to include in your project.
     * If you name a folder in the array, then it will also include
     * the files inside that folder.
     */
    export var files : string[];

    /**
     * The main field is a module ID that is the primary entry point to your program.
     */
    export var main : string;

    /**
     * Names of binaries for this package
     */
    export var bin : {};

    /**
     * Specify either a single file or an array of filenames to put in place for the man program to find.
     */
    export var man : string[];

    /**
     * Recognized directories for the package
     */
    export var directories : {
      /**
       * If you specify a 'bin' directory, then all the files in that folder will be used as the 'bin' hash.
       */
      bin: string;

      /**
       * Put markdown files in here. Eventually, these will be displayed nicely, maybe, someday.
       */
      doc: string;

      /**
       * Put example scripts in here. Someday, it might be exposed in some clever way.
       */
      example: string;

      /**
       * Tell people where the bulk of your library is. Nothing special
       * is done with the lib folder in any way, but it's useful meta info.
       */
      lib : string;

      /**
       * A folder that is full of man pages. Sugar to generate a 'man' array by walking the folder.
       */
      man : string;

      /**
       * Test folder
       */
      test : string
    };

    /**
     * Specify the place where your code lives. This is helpful for people who want to contribute.
     */
    export var repository : {
      type : string;
      url : string;
    };

    /**
     * The 'scripts' member is an object hash of script commands that are run at various times in
     * the lifecycle of your package. The key is the lifecycle event, and the value is
     * the command to run at that point.
     */
    export var scripts : {}

    /**
     * A 'config' hash can be used to set configuration parameters used in
     * package scripts that persist across upgrades.
     */
    export var config : {};

    /**
     * Dependencies are specified with a simple hash of package name to version range.
     * The version range is a string which has one or more space-separated descriptors.
     * Dependencies can also be identified with a tarball or git URL.
     */
    export var dependencies : {};
    export var devDependencies : {};
    export var optionalDependencies : {};
    export var peerDependencies : {};

    /**
     * Array of package names that will be bundled when publishing the package.
     */
    export var bundleDependencies : string[];

    export var engines : {};
    export var engineStrict : boolean;
    export var os : string[];
    export var cpu : string[];

    /**
     * If your package is primarily a command-line application
     * that should be installed globally, then set this value to
     * true to provide a warning if it is installed locally.
     */
    export var preferGlobal : boolean;

    /**
     * If set to true, then npm will refuse to publish it.
     */
    export var private : boolean;

    export var publishConfig : {};

    export var dist : {
      shasum : string;
      tarball : string;
    };

    export var readme : string;
}
