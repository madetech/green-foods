# Green Foods

A web app for checking the amount of CO<sup>2</sup> is produced by the foods we buy.

## Getting Set Up

Installation instructions assume development is taking place on a Mac with a working `homebrew` installation. You will also need to either set up an AWS account, or ask your organisation for access to an account.

### Install AWS CLI

Instructions taken from [aws docs](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

```bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

### Install AWS-Vault

For this project we are using `aws-vault` to keep aws credential secure. This step is not necessary if you only have access to a single aws account.

```bash
brew install --cask aws-vault
```

Add your aws credentials to aws-vault:

```bash
aws-vault add <PROFILE_NAME>
```

you will be prompted for your `aws access key` and `aws secret access key`

#### :warning: Working with AWS SSO

If you are using `aws sso` then you do not need to provide your keys, just press enter when prompted. You will then need to empty the stored credentials with `aws-vault remove <PROFILE_NAME>` and then add the following to your `.aws/config` file:

```bash
[profile <PROFILE_NAME>]
sso_start_url=<SSO_START_URL>
sso_region=<REGION>
sso_account_id=<ACCOUNT_ID>
sso_role_name=<SSO_ROLE>
output=json
```

You will most likely need to ask other people on your project for the values to put into this file.

#### Testing your AWS-Vault/AWS CLI configuration

You can test your configuration by running a simple command in AWS:

```bash
aws-vault exec <PROFILE_NAME> --no-session -- aws s3 ls
```

If you see a list of s3 buckets without any errors, then everything is working.

### Install TFEnv

We are using terraform to manage the deployment of cloud resources, and tfenv to manage the installation of terraform. Install tfenv with:

```bash
brew install tfenv
```

Once this is complete, set the version of terraform to use with:

```bash
tfenv use 1.3.6
```
