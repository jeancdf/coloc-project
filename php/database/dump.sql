-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- flatsharing table
CREATE TABLE flatsharing (
  id INT PRIMARY KEY AUTO_INCREMENT,
  admin_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES users(id)
);

-- Expenses table
CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  flatsharing_id INT NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  description VARCHAR(255) NOT NULL,
  FOREIGN KEY (flatsharing_id) REFERENCES flatsharing(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Participants table
CREATE TABLE participants (
  user_id INT NOT NULL,
  flatsharing_id INT NOT NULL,
  accepted BOOL NOT NULL,
  PRIMARY KEY (user_id, flatsharing_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (flatsharing_id) REFERENCES flatsharing(id)
);