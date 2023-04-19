export function truncate(str, max) {
    return str.length > max ? str.substr(0, max-1) + '…' : str;
  }

export function stringIsEmptyOrSpaces(str){
  return str === null || str.match(/^ *$/) !== null;
}