# BioT Environment Configuration Script

This script automates the configuration of a BioT Platform Environment, for using it with Sample Mobile Application, by creating Device Templates, Usage Type Templates, editing Patient Templates, and generating Registration Codes under the default organization. This README provides a step-by-step guide on how to run the script.

## Prerequisites

Before running the script, make sure you have the following prerequisites in place:

1. Python 3.10 installed from [here](https://www.python.org/downloads/release/python-31011/).
2. Required Python libraries listed in `requirements.txt` installed.

## Installation

1. Install the required Python libraries using pip: 

```bash
pip install -r requirements.txt
```

Note that if you're using Windows, you need to open CMD in Admin Mode.

2. Go to a `.env.local` file in the project/scripts directory and configure it with the necessary environment variables. You can use the provided .env.local as a template under scripts folder.

3. Please change/add values to next environment keys:

- DOMAIN_URL - address to the BioT environment. Usually provided in the format: `https://api.<env>.<customer>.biot-med.com`

- USER_NAME - manufacturer admin user username

- USER_PASS - manufacturer admin user password


## Usage

To run the script and configure your PaaS environment, follow these steps:

1. Open a terminal and navigate to the project/scripts directory.

Execute the script by running the following command:

```bash
python setup.py
```

The script will create Device Templates, Usage Type Templates, edit Patient Templates, and generate Registration Codes under the default organization based on the configuration in the .env.local file.

#### After running the script your BioT account is ready to communicate with the mobile starter app.