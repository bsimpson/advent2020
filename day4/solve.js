const fs = require('fs')

let data;
try {
  data = fs.readFileSync('./passports.txt', 'utf8')
} catch (err) {
  console.error(err)
}

let passportsRaw = data.split('\n\n');
let passports = passportsRaw.map(passport => passport.replace(/\n/g, ' '));

// part one
// let valid = passports.filter(passport => {
//   let parts = passport.split(' ').reduce((agg, part) => {
//     let [key, value] = part.split(':');
//     agg[key] = value;
//     return agg;
//   }, {});

//   if (parts['byr'] && parts['iyr'] && parts['eyr'] && parts['hgt'] && parts['hcl'] && parts['ecl'] && parts['pid']) {
//     return true;
//   }

//   return false;
// })

// console.log(valid.length);

// part two
let valid = passports.filter(passport => {
  let parts = passport.split(' ').reduce((agg, part) => {
    let [key, value] = part.split(':');
    agg[key] = value;
    return agg;
  }, {});

  if (parts['byr'] && parseInt(parts['byr']) >= 1920 && parseInt(parts['byr']) <= 2002) {
  } else {
    return false;
  }

  if (parts['iyr'] && parseInt(parts['iyr']) >= 2010 && parseInt(parts['iyr']) <= 2020) {
  } else {
    return false;
  }

  if (parts['eyr'] && parseInt(parts['eyr']) >= 2020 && parseInt(parts['eyr']) <= 2030) {
  } else {
    return false;
  }

  if (!parts['hgt'] || parts['hgt'].length <= 0) {
    return false;
  }
  let matches = parts['hgt'].match(/(\d*)(cm|in)/);
  if (!matches) {
    return false;
  }

  let scale = matches[2];
  let measurement = parseInt(matches[1]);
  if (scale == 'cm') {
    if (measurement >= 150 && measurement <= 193) {
    } else {
      return false;
    }
  } else if (scale == 'in') {
    if (measurement >= 59 && measurement <= 76) {
    } else {
      return false;
    }
  } else {
    return false;
  }

  if (parts['hcl'] && parts['hcl'].match(/#[0-9,a-f]{6}/)) {
  } else {
    return false;
  }

  if (parts['ecl'] && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(parts['ecl']) >= 0) {
  } else {
    return false;
  }

  if (parts['pid'] && parts['pid'].match(/^\d{9}$/)) {
  } else {
    return false;
  }

  return true;
})

console.log(valid.length);