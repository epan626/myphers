var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    bcrypt   = require('bcrypt');
    SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      validator: [{
        validator: function( email ){
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test( email )
        },
        message: '{ VALUE } is not a valid email address'
      },
      {
        validator: function( email ){
          return false;
        },
        message: '{ VALUE } failed this validator'
      }
      ],
       required: [true, 'Email is required']
    },
    first_name: {
      type: String,
      required: [true, 'Your first name is required'],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Your last name is required'],
      trim: true
    },
    password: {
      type: String,
      required: [true, 'A password is required'],
      minlength: 3,
      maxlength: 32
    },
    _orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
  },
    {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
    });

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

  UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });

};

module.exports = mongoose.model('User', UserSchema);
