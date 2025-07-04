/**
 * Split the path by `Users/<NAME_OF_USER>` and return the user home directory and the relative path after it
 *
 * Example: /Users/iamarek/Projects/NameOfProject -> ['/Users/iamarek', '/Projects/NameOfProject']
 */
const splitUserPath = (path: string): [string, string] | [string] => {
  const pathParts = path.split("/");
  const usersIndex = pathParts.findIndex((part) => part === "Users");

  if (usersIndex === -1 || usersIndex + 1 >= pathParts.length) {
    return [path];
  }

  const userHomeIndex = usersIndex + 1;
  const userHomePath = pathParts.slice(0, userHomeIndex + 1).join("/");
  const relativePath = "/" + pathParts.slice(userHomeIndex + 1).join("/");

  return [userHomePath, relativePath];
};

export { splitUserPath };
